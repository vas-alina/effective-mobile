import { renderLeads } from "../hook/render-leads";

export function fetchLeads(statusDiv, date = '', startDate = '', endDate = '', sort = 'ASC') {
    if (!(statusDiv instanceof HTMLElement)) {
        console.error('statusDiv не является HTML-элементом:', statusDiv);
        return;
    }

    let url = 'http://localhost:5000/leads';
    const params = new URLSearchParams();

    if (date) {
        params.append('date', date);
    }

    if (startDate) {
        params.append('startDate', startDate);
    }

    if (endDate) {
        params.append('endDate', endDate);
    }

    if (sort) {
        params.append('sort', sort);
    }

    if (params.toString()) {
        url += '?' + params.toString();
    }

    console.log('URL запроса:', url);

    fetch(url, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка получения данных');
            return response.json();
        })
        .then(data => {
            const leads = data.data;
            console.log('Массив Обращений:', leads);

            if (!Array.isArray(leads) || leads.length === 0) {
                console.log('Обращений пока нет.');
                statusDiv.textContent = 'Обращений пока нет.';
                statusDiv.className = 'info';
                return;
            }

            statusDiv.innerHTML = '';
            statusDiv.className = '';

            renderLeads(leads, statusDiv);

        })
        .catch(error => {
            console.error('Ошибка:', error);
            statusDiv.textContent = 'Произошла ошибка. Попробуйте позже.';
            statusDiv.className = 'error';
        });
};