document.getElementById('passwordForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const form = this;
    const formData = new FormData(form);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Очищаем предыдущие уведомления
    let alertDiv = document.querySelector('.alert');
    if (alertDiv) alertDiv.remove();

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        const data = await response.json();

        // Создаём уведомление
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${data.status === 'success' ? 'success' : 'danger'} mt-3`;
        alertDiv.textContent = data.message;
        form.parentNode.insertBefore(alertDiv, form);

        if (data.status === 'success') {
            // Очищаем поля формы
            form.reset();
            // Обновляем страницу через 2 секунды
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    } catch (error) {
        console.error('Ошибка AJAX:', error);
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger mt-3';
        alertDiv.textContent = 'Произошла ошибка при отправке запроса.';
        form.parentNode.insertBefore(alertDiv, form);
    }
});
