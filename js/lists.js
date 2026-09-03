// code for the list feature 

function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.onclick = () => {
            const item = header.parentElement;
            item.classList.toggle('active');
            const icon = header.querySelector('.accordion-toggle');
            if (icon) {
                icon.innerText = item.classList.contains('active') ? '-' : '+';
            }
        };
    });
}