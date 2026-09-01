// fetch project data from assets on script load so that it resolves on load of site to avoid latency
const projectDataPromise = fetch('assets/projects/projectData.json').then(r => r.json());

// project list builder called by pageLoader after loading projects.html
async function initProjects() {
    const projects = await projectDataPromise;

    const container = document.querySelector('.project-list');
    const template = document.getElementById('project-row-template');
    if (!container || !template) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const row = template.content.cloneNode(true);

        row.querySelector('.project-row-icon').innerHTML = project.icon;
        row.querySelector('.project-row-name').textContent = project.name;
        row.querySelector('.project-row-year').textContent = project.year;
        row.querySelector('.project-row-meta').textContent = project.meta;

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
    $('.project-detail-meta').textContent = project.year + ' · ' + project.tools;
    $('.project-detail-description').textContent = project.description;

    const link = $('.project-detail-link');
    link.href = project.link;
    link.textContent = project.linkText;

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
