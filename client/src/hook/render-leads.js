import { cancelLead } from '../api/cancel-lead.js';
import { doneLead } from '../api/done-lead.js';
import { workLead } from '../api/work-lead.js';

export function renderLeads(leads, statusDiv) {
    statusDiv.innerHTML = '';
    statusDiv.className = '';

    const list = document.createElement('ul');

    leads.forEach(lead => {

        const formattedDate = new Date(lead.createdAt).toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        const listItem = document.createElement('li');
        listItem.classList = ("leads-item");
        listItem.innerHTML = `
            <span class="id-span">${lead.status}</span>
            <span class="date-span">${formattedDate}</span>
            <div class="lead-span">
            <span class="title-span">${lead.title}</span>
            <span class="text-span">${lead.text}</span>
            </div >
            <button id="workBtn-${lead.id}" class="work-btn">Взять в работу</button>
            <button id="cancelBtn-${lead.id}" class="cancel-btn">Отменить</button>
            <button id="deleteBtn-${lead.id}" class="done-btn">Завершить</button>
          
            <span class="result-span">${lead.leadResult || ''}</span>
        `;
        list.appendChild(listItem);

        const workBtn = listItem.querySelector(`#workBtn-${lead.id}`);
        workBtn.addEventListener('click', () => {
            workLead(lead.id);
        });

        const cancelBtn = listItem.querySelector(`#cancelBtn-${lead.id}`);
        cancelBtn.addEventListener('click', () => {
            cancelLead(lead.id);
        });


        const deleteBtn = listItem.querySelector(`#deleteBtn-${lead.id}`);
        deleteBtn.addEventListener('click', () => {
            doneLead(lead.id);
        });
    });

    statusDiv.appendChild(list);
}