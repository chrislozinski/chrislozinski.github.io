// moving all my navigation bar code into one folder 

// to load the navigaiton bar on each of the pages, this function will be called 
// this was originally in my html file but gotta implement good oop practices lol
/*
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

document.addEventListener('DOMContentLoaded', function() {
    loadNavBar();
});
*/
$(document).ready(function(){
    $("#header").load("header.html");
    $("#navbar").load("navMenu.html");

});
