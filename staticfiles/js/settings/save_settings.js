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
