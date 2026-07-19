// project data, add a new object here to add a project 
const projectData = [
    {
        slug: 'project-os',
        name: 'STEM Education Focused OS',
        year: '2026',
        tools: 'linux · shell',
        meta: 'linux · shell · a locked-down classroom OS',
        icon: '<svg class="project-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2 3h20v13H2zm2 2v9h16V5zm4 11v2H6v2h12v-2h-2v-2zm-2 4h12v-4H6zM8 8h5v2H8zm0 3h8v2H8z"/></svg>',
        description: 'Currently building a lightweight Linux OS, based on minimal Debian, specifically tailored towards K-12 STEM education. System boots into a "locked-down" environment to maximize student focus and retention on complex topics. Developed as a Computer Science Project course under the supervision of Prof. Stefan Kremer at the University of Guelph.',
        screenshots: [
            { label: 'boot environment', src: '' },
            { label: 'lesson mode', src: '' }
        ],
        link: '#',
        linkText: 'view on github ›'
    },
    {
        slug: 'project-birdwatcher',
        name: 'BirdWatcher',
        year: '2025',
        tools: 'flutter · python',
        meta: 'flutter · python · a bird-collecting camera app',
        icon: '<svg class="project-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M8 4h6v2h2v2h2v2h-2v2h-2v2H8v-2H6v-2H4v-2h2V6h2zm0 2v2H6v2h2v2h6v-2h2v-2h2V8h-2V6zm2 2h2v2h-2zm4 8H8v2h6zm-2 2h-2v2h2z"/></svg>',
        description: 'Pokémon Go-inspired mobile app to identify and "collect" birds using your phone\'s camera and a custom vision model that connects to OpenAI\'s API to generate unique descriptions for each bird.',
        screenshots: [
            { label: 'camera view', src: '' },
            { label: 'collection', src: '' },
        ],
        link: '#',
        linkText: 'view on github ›'
    },
    {
        slug: 'project-freelance',
        name: 'Freelance Web Design',
        year: '2019 \u2013 present',
        tools: 'css · html5 · js',
        meta: 'css · html · js · sites built from scratch',
        icon: '<svg class="project-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M2 3h20v18H2zm2 2v14h16V5zm1 1h3v2H5zm4 0h3v2H9zm4 0h3v2h-3zM5 10h14v8H5zm2 2v4h10v-4z"/></svg>',
        description: 'Built webpages from the ground up, implementing custom JS, HTML and CSS for smooth, seamless and unique functionalities across all devices. Working one-on-one with clients as the sole designer and programmer, managing projects from concept to product delivery.',
        // fill in the src in this format for screenshots src: 'assets/os-boot.png'
        screenshots: [
            { label: 'site example', src: '' },
            { label: 'detail', src: '' },
        ],
        link: '#',
        linkText: 'view work ›'
    }
];

// project list builder called by pageLoader after loading projects.html
function initProjects() {
    const container = document.querySelector('.project-list');
    const template = document.getElementById('project-row-template');
    if (!container || !template) return;

    container.innerHTML = '';

    projectData.forEach(project => {
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


// builds the detail view for a project from the data array
function showProjectDetail(slug) {
    const project = projectData.find(p => p.slug === slug);
    if (!project) return;

    const detail = document.getElementById('project-detail-template').content.cloneNode(true);
    const $ = s => detail.querySelector(s);

    // Populate basic text and links
    $('.project-detail-title').textContent = project.name;
    $('.project-detail-meta').textContent = project.year + ' · ' + project.tools;
    $('.project-detail-description').textContent = project.description;

    const link = $('.project-detail-link');
    link.href = project.link;
    link.textContent = project.linkText;

    // Loop through and build screenshots explicitly
    const container = $('.project-screenshots');

    project.screenshots.forEach((screenshot, i) => {
        const div = document.createElement('div');
        
        // Default to a side screenshot, override only for the first one
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

    // Swap the content and update the document title
    document.getElementById('main').replaceChildren(detail);
    document.title = project.name;
}