import { fetchLeads } from "../api/fetch-lead";
import { cancelAllWorkLeads } from "../api/cancel-all-work-leads";
import "../style.css"

export function adminPage() {
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'admin-container';

    const title = document.createElement('h1');
    title.textContent = 'Страница администратора';

    const filterDiv = document.createElement('div');
    filterDiv.className = 'filter-container';

    const dateTitle = document.createElement('h3');
    dateTitle.className = 'date-title';
    dateTitle.textContent = 'Введите дату для поиска заявки';

    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'dateInput';
    dateInput.placeholder = 'Дата';

    const choiceDateTitle = document.createElement('h3');
    choiceDateTitle.className = 'date-title';
    choiceDateTitle.textContent = 'или выберите диапазон дат';

    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.id = 'startDateInput';
    startDateInput.placeholder = 'Начальная дата';

    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.id = 'endDateInput';
    endDateInput.placeholder = 'Конечная дата';

    const searchBtn = document.createElement('button');
    searchBtn.textContent = 'Искать';
    searchBtn.id = 'search-btn';

    filterDiv.appendChild(dateTitle);
    filterDiv.appendChild(dateInput);
    filterDiv.appendChild(choiceDateTitle);
    filterDiv.appendChild(startDateInput);
    filterDiv.appendChild(endDateInput);
    filterDiv.appendChild(searchBtn);

    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'button-container';

    const cancelAllBtn = document.createElement('button');
    cancelAllBtn.textContent = 'Отменить все в работе';
    cancelAllBtn.id = 'cancel-all-btn';

    const reloadBtn = document.createElement('button');
    reloadBtn.textContent = 'Обновить';
    reloadBtn.id = 'reload-btn';

    buttonDiv.appendChild(cancelAllBtn)
    buttonDiv.appendChild(reloadBtn)

    const statusDiv = document.createElement('div');
    statusDiv.id = 'statusDiv';

    container.appendChild(title);
    container.appendChild(filterDiv);
    container.appendChild(buttonDiv);
    container.appendChild(statusDiv);
    appDiv.appendChild(container);

    fetchLeads(statusDiv);

    reloadBtn.addEventListener('click', function () {
        fetchLeads(statusDiv);
    });

    searchBtn.addEventListener('click', function () {
        const date = dateInput.value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        fetchLeads(statusDiv, date, startDate, endDate);
    });

    cancelAllBtn.addEventListener('click', async function () {
        await cancelAllWorkLeads();
        fetchLeads(statusDiv);
    });
}
