// moving all my navigation bar code into one folder 

// to load the navigaiton bar on each of the pages, this function will be called 
// this was originally in my html file but gotta implement good oop practices lol

async function loadNavBar() {
    document.body.style.opacity = '0'; // ill try to hide body (dexter lol) at first to prevent flashing
    
    // load both components in parallel
    const [headerHTML, navHTML] = await Promise.all([
        fetch('../templates/header.html').then(r => r.text()),
        fetch('../templates/navMenu.html').then(r => r.text())
    ]);
    
    // insert content
    document.getElementById('header').innerHTML = headerHTML;
    document.getElementById('navbar').innerHTML = navHTML;
    
    // try to show body with fade in
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
}

// load when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavBar);
} else {
    loadNavBar();
}