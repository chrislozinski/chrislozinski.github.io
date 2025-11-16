// this function will be called to load the navigaiton bar on each of the pages, into the empty div in the index.html file
// this was originally in my html file but gotta implement good oop practices lol

async function loadNavBar() {
    const navHTML = await fetch('htmlFiles/navMenu.html').then(r => r.text()); // we first fetch the navmenu html content in its file, open it in read mode
    document.getElementById('navbar').innerHTML = navHTML; // then we insert the content in the navbar.html file into the empty nav bar div in index.html

}

document.addEventListener('DOMContentLoaded', loadNavBar); // finally we just wait for stucture of the page to be ready and then call the load nav bar function to load the nav bar on the new page 