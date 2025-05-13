$(document).ready(function() {
    // Показать настройки уведомлений после ввода имени пользователя
    $('#telegramUsername').on('input', function() {
        const username = $(this).val().trim();
        if (username.startsWith('@') && username.length > 1) {
            $('#notificationSettings').show();
        } else {
            $('#notificationSettings').hide();
        }
    });

    // Обработка клика по кнопке "Connect"
    $('#connectTelegram').click(function() {
        const telegramUsername = $('#telegramUsername').val().trim();
        const notifications = {
            new_posts: $('#telegramNewPostCheck').is(':checked'),
            post_published: $('#telegramPostPublishedCheck').is(':checked'),
            tokens: $('#telegramTokensCheck').is(':checked'),
            billing: $('#telegramBillingCheck').is(':checked')
        };

        // Проверка, что username введён
        if (!telegramUsername || !telegramUsername.startsWith('@')) {
            alert(window.Translations.invalid_username);
            return;
        }

        // Отправка данных через AJAX
        $.ajax({
            url: '/telegram/subscribe/',
            type: 'POST',
            data: JSON.stringify({
                telegram_username: telegramUsername,
                notifications: notifications
            }),
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            success: function(response) {
                if (response.status === 'success') {
                    alert(window.Translations.success_message);
                    $('#notificationSettings').hide();
                    $('#telegramUsername').val('');
                } else {
                    alert(window.Translations.error_message + response.message);
                }
            },
            error: function(xhr) {
                alert(window.Translations.general_error);
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
