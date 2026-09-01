// this file loads each of the html pages into the index file 
// since my site is a spa site, it pretty much fully removes any wait times and refresh artifacts when going between pages
// is used in the index.html file 

// fetchs the page that is requested by clicking it on the nav bar, loads it into the index file 
async function loadPage(page) {
    const html = await fetch(`htmlFiles/${page}.html`).then(r => r.text()); // grabs the page 
    document.getElementById('main').innerHTML = html; // then inserts it iinto the div main in index.html empty main
    document.title = page.charAt(0).toUpperCase() + page.slice(1); // change the browser tab title to the page title to match

    if (typeof initAccordions === 'function') { // check for whether i have a list on my page
        initAccordions();
    }

    if (typeof initContactForm === 'function') {
        initContactForm();
    }

    // build the project list rows if we're on the projects page
    if (typeof initProjects === 'function') {
        initProjects();
    }

    if (typeof setActiveNav === 'function') {
        setActiveNav(page);
    }
}

// this handles nav bar clicks
document.addEventListener('click', e => {
    if (e.target.tagName === 'A' && (e.target.closest('#navbar') || e.target.classList.contains('mobile-topbar-name'))) { // check if an element in the a tag is clicked, since thats a link to another page and if thats within my navbar
        e.preventDefault(); // we dont want to reload the page which is the default behaviour so we prevent it

        const page = e.target.getAttribute('href').substring(1) // get the value from the href so the page variable stores the page clicked on by the user, and strip the hash

        loadPage(page); // calls the load page function, sending which page was requested by the user in their click of it in the nav bar

        history.pushState(null, '', `#${page}`); // update the url in the address bar to match the current displayed page, without reloading mind you
    }

});

// by default we always load the home page instead of the index, so we just send the page name about into the load page function
const initialPage = window.location.hash ? window.location.hash.substring(1) : 'about';

// if hash points to project detail, show it from the data instead of fetching an html file
if (initialPage.startsWith('project-') && typeof showProjectDetail === 'function') {
    // Load the projects page first so the templates enter the DOM, THEN show the detail view
    loadPage('projects').then(() => {
        showProjectDetail(initialPage);
    });
} else {
    loadPage(initialPage);
}