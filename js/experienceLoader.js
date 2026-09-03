// fetch experience data from assets on script load so that it resolves on load of site to avoid latency
const experienceDataPromise = fetch('assets/experience/experienceData.json').then(r => r.json());

// experience list builder called by pageLoader after loading experience.html
async function initExperience() {
    const entries = await experienceDataPromise;

    const container = document.querySelector('.exp-list');
    const template = document.getElementById('exp-entry-template');
    if (!container || !template) return;

    container.innerHTML = '';

    for (const entry of entries) {
        const card = template.content.cloneNode(true);

        // fill in the text fields
        card.querySelector('.exp-entry-company').textContent = entry.company;
        card.querySelector('.exp-entry-date').textContent = entry.date;
        card.querySelector('.exp-entry-role-title').textContent = entry.role;
        card.querySelector('.exp-entry-role-location').textContent = entry.location;

        // build the bullet list from the array
        const bulletList = card.querySelector('.exp-points');
        for (const text of entry.bullets) {
            const li = document.createElement('li');
            li.textContent = text;
            bulletList.appendChild(li);
        }

        // build the tags from the array, wrapping each in brackets
        const tagRow = card.querySelector('.exp-tags');
        for (const tag of entry.tags) {
            const span = document.createElement('span');
            span.className = 'exp-tag';
            span.textContent = '[ ' + tag + ' ]';
            tagRow.appendChild(span);
        }

        container.appendChild(card);
    }
}
