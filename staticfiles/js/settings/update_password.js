document.getElementById('passwordForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    const form = this;
    const formData = new FormData(form);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Очищаем предыдущие уведомления
    let alertDiv = document.querySelector('.alert');
    if (alertDiv) alertDiv.remove();

    try {
        // Отправляем данные на фронтенд для логирования
        const frontendLogResponse = await fetch('/settings/change-password/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        const frontendLogData = await frontendLogResponse.json();
        console.log('Ответ от фронтенда:', frontendLogData);

        // Отправляем основной запрос на бэкенд
        const backendResponse = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        const backendData = await backendResponse.json();

        // Создаём уведомление
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${backendData.status === 'success' ? 'success' : 'danger'} mt-3`;
        alertDiv.textContent = backendData.message;
        form.parentNode.insertBefore(alertDiv, form);

        if (backendData.status === 'success') {
            // Очищаем поля формы
            form.reset();
            // Обновляем страницу через 2 секунды
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    } catch (error) {
        console.error('Ошибка AJAX:', error);
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger mt-3';
        alertDiv.textContent = 'Произошла ошибка при отправке запроса.';
        form.parentNode.insertBefore(alertDiv, form);
    }
});

// Переключение видимости пароля
function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener('click', function() {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggle.classList.toggle('bi-eye', !isPassword);
        toggle.classList.toggle('bi-eye-slash', isPassword);
    });
}

// Применяем переключение для всех полей
togglePasswordVisibility('currentPassword', 'toggleCurrentPassword');
togglePasswordVisibility('newPassword', 'toggleNewPassword');
togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
