// Две вклажки
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.auth-tab');
    const formContainers = document.querySelectorAll('.auth-form-container');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс у всех вкладок и форм
            tabs.forEach(t => t.classList.remove('active'));
            formContainers.forEach(fc => fc.classList.remove('active'));

            // Добавляем активный класс к текущей вкладке
            this.classList.add('active');

            // Показываем соответствующую форму
            const tabType = this.getAttribute('data-tab');
            const targetForm = document.getElementById(`${tabType}-form`);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
});
// Показать пароль
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('i');

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        icon.classList.toggle('ph-eye', !isPassword);
        icon.classList.toggle('ph-eye-slash', isPassword);
    });
});
// Обработка отправки форм
document.querySelectorAll('#loginForm, #registerForm').forEach(form => {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const csrftoken = this.querySelector('[name=csrfmiddlewaretoken]').value;

        // Очищаем предыдущие уведомления
        let alertDiv = this.querySelector('.alert');
        if (alertDiv) alertDiv.remove();

        try {
            const response = await fetch(this.action, {
                method: this.method,
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
            this.prepend(alertDiv);

            if (data.status === 'success') {
                // Перенаправляем на главную страницу через 2 секунды
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
        } catch (error) {
            console.error('Ошибка AJAX:', error);
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-danger mt-3';
            alertDiv.textContent = 'Произошла ошибка при отправке запроса.';
            this.prepend(alertDiv);
        }
    });
});

// Установка текущего года в футере
document.getElementById('currentYear').textContent = new Date().getFullYear();
