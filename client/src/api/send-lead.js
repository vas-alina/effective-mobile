export function sendLead(titleInput, textInput, statusDiv, form, submitBtn) {
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    fetch("http://localhost:5000/lead", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInput.value,
            text: textInput.value
        })
    })
        .then(response => {
            if (!response.ok) throw new Error('Ошибка отправки');
            return response.json();
        })
        .then(data => {
            statusDiv.textContent = 'Обращение успешно отправлено!';
            statusDiv.className = 'success';
            form.reset();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            statusDiv.textContent = 'Произошла ошибка. Попробуйте позже.';
            statusDiv.className = 'error';
        })
        .finally(() => {

            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить';
        });
};