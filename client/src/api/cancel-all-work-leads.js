export function cancelAllWorkLeads() {
    fetch(`http://localhost:5000/leads/cancel-work`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reason: `Обращение отменено`
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Все обращения в статусе "В работе" успешно отменены') {
                alert('Все обращения "В работе" отменены');
                location.reload();
            } else {
                alert('Ошибка отмены обращения');
            }
        })
        .catch(error => {
            console.error('Ошибка при отмене обращения:', error);
            alert('Ошибка при отмене обращения');
        });
};