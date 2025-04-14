// Обработчик для формы профиля
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Собираем данные формы
        const formData = new FormData(profileForm);

        // Отправляем данные через AJAX
        fetch(profileForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',  // Указываем, что это AJAX-запрос
            },
        })
        .then(response => response.json())  // Ожидаем JSON-ответ от сервера
        .then(data => {
            if (data.status === 'success') {
                showAlert(data.message, 'success');
                // Переадресация на страницу /settings
                if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                }
            } else {
                // Показываем сообщение об ошибке
                showAlert(data.message, 'danger');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showAlert('Произошла ошибка при сохранении настроек', 'danger');
        });
    });
}

// Функция для показа уведомления (предполагается, что она у вас есть)
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);  // Удаляем через 3 секунды
}

// Функция для показа уведомлений
function showAlert(message, type = 'info') {
const alertsContainer = document.getElementById('alertsContainer');
const alertId = Date.now();

const alertElement = document.createElement('div');
alertElement.className = `alert alert-${type} alert-dismissible fade show`;
alertElement.role = 'alert';
alertElement.id = `alert-${alertId}`;

alertElement.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;

alertsContainer.appendChild(alertElement);

// Автоматическое скрытие уведомления через 5 секунд
setTimeout(() => {
    const alert = document.getElementById(`alert-${alertId}`);
    if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
    }
}, 5000);
}
