document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addPaymentMethodForm');
    const saveButton = document.getElementById('savePaymentMethodBtn');
    const inputs = form.querySelectorAll('input[required]');

    saveButton.addEventListener('click', function () {
        let isValid = true;

        // Проверка всех обязательных полей
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        // Если все поля заполнены, отправляем форму
        if (isValid) {
            const formData = new FormData(form);

            fetch('/add-payment-method/', {  // Укажите правильный URL вашего обработчика
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')  // Получение CSRF-токена
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Закрываем модальное окно
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addPaymentMethodModal'));
                    modal.hide();
                    alert(data.message);  // Показываем сообщение об успехе
                } else {
                    alert('Ошибка при обработке формы.');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке формы.');
            });
        }
    });

    // Удаление класса is-invalid при вводе данных
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (input.value.trim()) {
                input.classList.remove('is-invalid');
            }
        });
    });

    // Функция для получения CSRF-токена из cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
