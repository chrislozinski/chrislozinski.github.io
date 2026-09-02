// resolution we rasterize svg icons at, large enough that the art survives before the browser averages it down to the small display size
const iconRasterSize = 256;

// fetch project data on load so it resolves early, and prep each icon so it renders instantly when the projects page opens
const projectDataPromise = fetch('assets/projects/projectData.json')
    .then(r => r.json())
    .then(async projects => {
        await Promise.all(projects.map(async project => {
            const icon = project.icon;
            if (icon == null || icon.includes('<svg')) return;                            // inline svg or none, nothing to prep
            if (!icon.toLowerCase().endsWith('.svg')) { new Image().src = icon; return; } // raster file, just warm the cache
            // svg file, paint it onto a canvas at full res so downscaling to the icon slot averages the pixels instead of dropping thin edges
            const img = new Image();
            img.src = icon;
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = iconRasterSize;
            canvas.getContext('2d').drawImage(img, 0, 0, iconRasterSize, iconRasterSize);
            project._iconUrl = await new Promise(res => canvas.toBlob(b => res(URL.createObjectURL(b))));
        }));
        return projects;
    });

// project list builder called by pageLoader after loading projects.html
async function initProjects() {
    const projects = await projectDataPromise;

    const container = document.querySelector('.project-list');
    const template = document.getElementById('project-row-template');
    if (!container || !template) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const row = template.content.cloneNode(true);

        // load icon as an inline svg string or an image file
        const iconContainer = row.querySelector('.project-row-icon');
        const icon = project.icon;
        if (icon.includes('<svg')) {
            // inline svg string, fill currentColor picks up the css colour automatically
            iconContainer.innerHTML = icon;
        } else {
            // file path, svg icons use the rasterized version prepared on load, raster files load directly
            const img = document.createElement('img');
            img.src = project._iconUrl ?? icon;
            img.alt = project.name;
            img.className = 'project-icon';
            if (icon.toLowerCase().endsWith('.svg')) img.classList.add('project-icon-svg');
            iconContainer.appendChild(img);
        }

        row.querySelector('.project-row-name').textContent = project.name;
        row.querySelector('.project-row-year').textContent = project.year;
        row.querySelector('.project-row-subtitle').textContent = project.tools.join(' · ') + ' · ' + (project.subtitle ?? '');

        row.querySelector('.project-row').onclick = () => {
            showProjectDetail(project.slug);
            history.pushState(null, '', '#' + project.slug);
        };

        container.appendChild(row);
    });
}

// builds the detail view for a project from the loaded data
async function showProjectDetail(slug) {
    const projects = await projectDataPromise;
    const project = projects.find(p => p.slug === slug);
    if (!project) return;

    const detail = document.getElementById('project-detail-template').content.cloneNode(true);
    const $ = s => detail.querySelector(s);

    $('.project-detail-title').textContent = project.name;
    $('.project-detail-subtitle').textContent = project.year + ' · ' + project.tools.join(' · ');
    $('.project-detail-description').textContent = project.description.join(' ');

    // build up to a few links side by side
    const links = $('.project-detail-links');
    project.links.forEach(l => {
        const a = document.createElement('a');
        a.className = 'project-detail-link';
        a.href = l.url;
        a.textContent = l.text;
        a.target = '_blank';
        links.appendChild(a);
    });

    const container = $('.project-screenshots');

    project.screenshots.forEach((screenshot, i) => {
        const div = document.createElement('div');

        div.className = 'project-screenshot-side';
        if (i === 0) {
            div.className = 'project-screenshot-main';
        }

        if (screenshot.src) {
            const img = document.createElement('img');
            img.src = screenshot.src;
            img.alt = screenshot.label;
            div.appendChild(img);
        } else {
            const placeholder = document.createElement('span');
            placeholder.className = 'project-screenshot-placeholder';
            placeholder.textContent = screenshot.label;
            div.appendChild(placeholder);
        }

        container.appendChild(div);
    });

    document.getElementById('main').replaceChildren(detail);
    document.title = project.name;
}
