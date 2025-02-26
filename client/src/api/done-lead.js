export function doneLead(id) {
    const reason = prompt('Введите ответ на обращение:');

    if (!reason || reason.trim() === '') {
        alert('Завершено: обязательна.');
        return;
    }

    fetch(`http://localhost:5000/leads/${id}/done`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reason: `Завершено:: ${reason}`
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Обращение успешно завершено') {
                alert('Обращение было успешно удалено');
                location.reload();
            } else {
                alert('Ошибка удаления обращения 1');
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении обращения:', error);
            alert('Ошибка при удалении обращения 2');
        });
};