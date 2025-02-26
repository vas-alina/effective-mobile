export function cancelLead(id) {
    const reason = prompt('Введите причину отмены:');

    if (!reason || reason.trim() === '') {
        alert('Причина отмены обязательна.');
        return;
    }

    fetch(`http://localhost:5000/leads/${id}/cancel`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reason: `Причина отмены: ${reason}`
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Обращение отменено успешно') {
                alert('Обращение было успешно отменено');
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