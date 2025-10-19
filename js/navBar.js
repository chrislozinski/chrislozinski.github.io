// moving all my navigation bar code into one folder 

// to load the navigaiton bar on each of the pages, this function will be called 
// this was originally in my html file but gotta implement good oop practices lol
function loadNavBar() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        }
    );
    
    fetch('navMenu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        }
    );
}

// to open the nav bar  
function openNavBar() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

// to close the nav bar  
function closeNavBar() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


document.addEventListener('DOMContentLoaded', function() {
    loadNavBar();
});