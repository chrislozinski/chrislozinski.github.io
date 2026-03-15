// this function will be called to load the navigaiton bar on each of the pages, into the empty div in the index.html file
// this was originally in my html file but gotta implement good oop practices lol
const navIcons = {
    home:       `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2h2v20H2v-8h2v6h4v-4h2v4h4v-6h2v6h4V4H10v2H8V2zm-8 10h2v2h-2zm-2-2h2v2h-2zm-2 0V8h2v2zm-2 2v-2h2v2zm0 0H4v2h2zm10-6h2v2h-2zm-2 0h-2v2h2zm2 4h2v2h-2z"/></svg>`,
    about:      `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M2 3H0v18h24V3zm20 2v14H2V5zM10 7H6v4h4zm-6 6h8v4H4zm16-6h-6v2h6zm-6 4h6v2h-6zm6 4h-6v2h6z"/></svg>`,
    experience: `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M2 11V5h6v6zm4-2V7H4v2zm16-4H10v2h12zm0 4H10v2h12zm-12 4h12v2H10zm12 4H10v2h12zM2 13v6h6v-6zm4 2v2H4v-2z"/></svg>`,
    projects:   `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M2 2h8v8H7v12H5V10H2zm2 2v4h4V4zm8 1h7.09v9H22v8h-8v-8h3.09V7H12zm4 11v4h4v-4z"/></svg>`,
    contact:    `<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M22 4H2v16h20zM4 18V6h16v12zM8 8H6v2h2v2h2v2h4v-2h2v-2h2V8h-2v2h-2v2h-4v-2H8z"/></svg>`
};

async function loadNavBar() {
    const navHTML = await fetch('htmlFiles/navMenu.html').then(r => r.text()); // we first fetch the navmenu html content in its file, open it in read mode
    document.getElementById('navbar').innerHTML = navHTML; // then we insert the content in the navbar.html file into the empty nav bar div in index.html
    
    document.querySelectorAll('#navbar a[href^="#"]').forEach(link => {
        const page = link.getAttribute('href').substring(1);
        if (navIcons[page]) link.insertAdjacentHTML('afterbegin', navIcons[page]);
    });
}

document.addEventListener('DOMContentLoaded', loadNavBar); // finally we just wait for stucture of the page to be ready and then call the load nav bar function to load the nav bar on the new page 