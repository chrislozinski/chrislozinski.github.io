// this file loads each of the html pages into the index file 
// since my site is a spa site, it pretty much fully removes any wait times and refresh artifacts when going between pages
// is used in the index.html file 

// fetchs the page that is requested by clicking it on the nav bar, loads it into the index file 
async function loadPage(page) {
    const html = await fetch(`htmlFiles/${page}.html`).then(r => r.text()); // grabs the page 
    document.getElementById('main').innerHTML = html; // then inserts it iinto the div main in index.html empty main
}

// this handles nav bar clicks
document.addEventListener('click', e => {
    if (e.target.tagName === 'A' && e.target.closest('#navbar')) { // check if an element in the a tag is clicked, since thats a link to another page and if thats within my navbar
        e.preventDefault(); // we dont want to reload the page which is the default behaviour so we prevent it

        const page = e.target.getAttribute('href'); // get the value from the href so the page variable stores the page clicked on by the user

        loadPage(page); // calls the load page function, sending which page was requested by the user in their click of it in the nav bar

        history.pushState(null, '', page);  // update the url in the address bar to match the current displayed page, without reloading mind you

        document.title = `${page.charAt(0).toUpperCase() + page.slice(1)}`; // change the browser tab title to the page title to match
    }

});

// by default we always load the home page instead of the index, so we just send the page name home into the load page function
loadPage('home');