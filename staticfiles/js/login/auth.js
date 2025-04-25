document.addEventListener('DOMContentLoaded', function() {
    // Переключение между вкладками входа и регистрации
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form-container');

    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Активируем выбранную вкладку
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Показываем соответствующую форму
            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(tabName + '-form').classList.add('active');
        });
    });

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

    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Проверка данных (для демонстрации)
            if (email === 'demo@example.com' && password === 'password123') {
                // Сохраняем информацию о пользователе
                const user = {
                    name: 'Иван Иванов',
                    email: email,
                    isLoggedIn: true
                };

                // Сохраняем в localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));

                // Показываем уведомление об успешном входе
                showNotification('Вход выполнен успешно!', 'success');

                // Перенаправляем на главную страницу через 1.5 секунды
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Показываем уведомление об ошибке
                showNotification('Неверный email или пароль', 'error');
            }
        });
    }

    // Обработка формы регистрации
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            // Проверка пароля
            if (password.length < 8) {
                showNotification('Пароль должен содержать минимум 8 символов', 'error');
                return;
            }

            // Проверка согласия с условиями
            if (!agreeTerms) {
                showNotification('Необходимо согласиться с условиями использования', 'error');
                return;
            }

            // Создаем нового пользователя (для демонстрации)
            const user = {
                name: name,
                email: email,
                isLoggedIn: true
            };

            // Сохраняем в localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Показываем уведомление об успешной регистрации
            showNotification('Регистрация выполнена успешно!', 'success');

            // Перенаправляем на главную страницу через 1.5 секунды
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Обработчики для кнопок социальной авторизации
    const socialButtons = [
        'googleAuthBtn', 'vkAuthBtn', 'telegramAuthBtn',
        'googleRegisterBtn', 'vkRegisterBtn', 'telegramRegisterBtn'
    ];

    socialButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function() {
                const service = btnId.includes('google') ? 'Google' :
                btnId.includes('vk') ? 'ВКонтакте' :
                'Телеграм';

 // Здесь должна быть реализация OAuth авторизации
 // Для демонстрации просто показываем уведомление
 showNotification(`Авторизация через ${service} в процессе разработки`, 'info');

 // Имитация успешной авторизации через соцсеть
 setTimeout(() => {
     // Создаем пользователя
     const user = {
         name: `Пользователь ${service}`,
         email: `user@${service.toLowerCase()}.com`,
         isLoggedIn: true,
         authMethod: service.toLowerCase()
     };

     // Сохраняем в localStorage
     localStorage.setItem('currentUser', JSON.stringify(user));

     // Показываем уведомление об успешном входе
     showNotification(`Вход через ${service} выполнен успешно!`, 'success');

     // Перенаправляем на главную страницу
     setTimeout(() => {
         window.location.href = 'index.html';
     }, 1500);
 }, 2000);
});
}
});

// Обработчик для ссылки на условия использования
const termsLink = document.querySelector('.terms-link');
if (termsLink) {
termsLink.addEventListener('click', function(e) {
e.preventDefault();
showNotification('Страница с условиями использования в разработке', 'info');
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

// Проверка, авторизован ли пользователь
function checkAuth() {
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser && currentUser.isLoggedIn) {
// Если пользователь уже авторизован, перенаправляем на главную страницу
window.location.href = 'index.html';
}
}

// Проверяем авторизацию при загрузке страницы
checkAuth();
});
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в футере
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
