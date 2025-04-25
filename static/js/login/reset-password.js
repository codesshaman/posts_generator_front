document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы форм и шагов
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordForm = document.getElementById('newPasswordForm');
    const resetStep1 = document.getElementById('reset-step1');
    const resetStep2 = document.getElementById('reset-step2');
    const resetStep3 = document.getElementById('reset-step3');
    const resetStep4 = document.getElementById('reset-step4');
    const resendLink = document.getElementById('resendLink');

    // Проверяем наличие параметра token в URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Если есть токен, показываем форму создания нового пароля
    if (token) {
        resetStep1.classList.remove('active');
        resetStep3.classList.add('active');
    }

    // Переключение видимости пароля
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('ph-eye');
                icon.classList.add('ph-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('ph-eye-slash');
                icon.classList.add('ph-eye');
            }
        });
    });

    // Обработка формы запроса на восстановление пароля
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('resetEmail').value;

            // Проверка email (для демонстрации)
            if (email) {
                // Здесь должен быть запрос к API для отправки письма
                // Для демонстрации просто переходим к следующему шагу

                // Сохраняем email для повторной отправки
                localStorage.setItem('resetEmail', email);

                // Показываем подтверждение отправки
                resetStep1.classList.remove('active');
                resetStep2.classList.add('active');

                // Показываем уведомление
                showNotification('Инструкции по восстановлению пароля отправлены на ваш email', 'success');
            } else {
                showNotification('Пожалуйста, введите корректный email', 'error');
            }
        });
    }

    // Обработка формы создания нового пароля
    if (newPasswordForm) {
        newPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Проверка пароля
            if (newPassword.length < 8) {
                showNotification('Пароль должен содержать минимум 8 символов', 'error');
                return;
            }

            // Проверка совпадения паролей
            if (newPassword !== confirmPassword) {
                showNotification('Пароли не совпадают', 'error');
                return;
            }

            // Здесь должен быть запрос к API для изменения пароля
            // Для демонстрации просто переходим к следующему шагу

            // Показываем подтверждение смены пароля
            resetStep3.classList.remove('active');
            resetStep4.classList.add('active');

            // Показываем уведомление
            showNotification('Пароль успешно изменен', 'success');
        });
    }

    // Обработчик для ссылки "Отправить повторно"
    if (resendLink) {
        resendLink.addEventListener('click', function(e) {
            e.preventDefault();

            const email = localStorage.getItem('resetEmail');

            if (email) {
                // Здесь должен быть запрос к API для повторной отправки письма
                // Для демонстрации просто показываем уведомление
                showNotification('Инструкции повторно отправлены на ваш email', 'success');
            } else {
                // Возвращаемся к первому шагу, если email не сохранен
                resetStep2.classList.remove('active');
                resetStep1.classList.add('active');
                showNotification('Пожалуйста, введите ваш email снова', 'info');
            }
        });
    }

    // Функция для отображения уведомлений
    function showNotification(message, type) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';

        // Добавляем класс в зависимости от типа уведомления
        if (type === 'success') {
            notification.classList.add('notification-success');
            notification.innerHTML = `<i class="ph ph-check-circle"></i> <span>${message}</span>`;
        } else if (type === 'error') {
            notification.classList.add('notification-error');
            notification.innerHTML = `<i class="ph ph-x-circle"></i> <span>${message}</span>`;
        } else if (type === 'info') {
            notification.classList.add('notification-info');
            notification.innerHTML = `<i class="ph ph-info"></i> <span>${message}</span>`;
        }

        // Добавляем уведомление на страницу
        document.body.appendChild(notification);

        // Показываем уведомление с анимацией
        setTimeout(function() {
            notification.classList.add('show');
        }, 10);

        // Скрываем уведомление через 3 секунды
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }
});
