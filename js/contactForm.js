// handles contact form submission via FormEasy (Google Apps Script)

const FORMEASY_URL = 'https://script.google.com/macros/s/AKfycbxwqcMkNFZhsWsq2X3uzlIWjVJGNeNvbV3Lgq1fRyWf4aRFP9NgdtJQi0QBj58qppEtlw/exec';

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return; // only runs when contact page is loaded

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        const btn = form.querySelector('.go-btn');

        const data = {
            name:    document.getElementById('contact-name').value.trim(),
            email:   document.getElementById('contact-email').value.trim(),
            subject: document.getElementById('contact-subject').value.trim(),
            message: document.getElementById('contact-message').value.trim()
        };

        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.className = 'form-status';
        status.textContent = '';

        try {
            const res = await fetch(FORMEASY_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // required by FormEasy
                body: JSON.stringify(data)
            });

            const json = await res.json();

            if (json.result === 'success') {
                status.className = 'form-status success';
                status.textContent = "Sent! I'll be in touch soon :)";
                form.reset();
            } else {
                throw new Error(json.error || 'Unknown error');
            }
        } catch {
            status.className = 'form-status error';
            status.textContent = 'Something went wrong. Try emailing me directly at clozinsk@uoguelph.ca';
        }

        btn.disabled = false;
        btn.textContent = 'Send';
    });
}