export function workLead(id) {

    fetch(`http://localhost:5000/leads/${id}/work`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            result: `Заявка в работе`
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Успешный ответ') {
                alert('Заявка взята в работу');
                location.reload();
            } else {
                alert('Ошибка при выборе заявки');
            }
        })
        .catch(error => {
            console.error('Ошибка при выборе заявки:', error);
            alert('Ошибка при выборе заявки');
        });
};