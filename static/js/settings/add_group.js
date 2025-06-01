const saveGroupBtn = document.getElementById('saveGroupBtn');
if (saveGroupBtn) {
    saveGroupBtn.addEventListener('click', function() {
        // Определяем, какая платформа выбрана
        const isVk = document.getElementById('vkRadio').checked;

        // Очищаем предыдущие ошибки
        clearErrors();

        // Собираем данные в зависимости от выбранной платформы
        let groupData = {};
        let isValid = true;

        if (isVk) {
            const vkGroupId = document.getElementById('vkGroupId');
            const vkGroupName = document.getElementById('vkGroupName').value.trim();
            const vkAdminCheck = document.getElementById('vkAdminCheck');

            // Проверка обязательных полей для ВКонтакте
            if (!vkGroupId.value.trim()) {
                isValid = false;
                vkGroupId.classList.add('is-invalid');
                document.getElementById('vkGroupIdError').textContent = window.Translations.input_id_or_address_vk_group;
            }
            if (!vkAdminCheck.checked) {
                isValid = false;
                vkAdminCheck.classList.add('is-invalid');
                document.getElementById('vkAdminCheckError').textContent = window.Translations.vk_admin_confirmation;
            }

            groupData = {
                platform: 'vk',
                groupId: vkGroupId.value.trim(),
                groupName: vkGroupName, // Необязательное поле
                isAdmin: vkAdminCheck.checked
            };
        } else {
            const telegramChannelName = document.getElementById('telegramChannelName');
            const telegramBotToken = document.getElementById('telegramBotToken');
            const telegramAdminCheck = document.getElementById('telegramAdminCheck');

            // Проверка обязательных полей для Telegram
            if (!telegramChannelName.value.trim()) {
                isValid = false;
                telegramChannelName.classList.add('is-invalid');
                document.getElementById('telegramChannelNameError').textContent = window.Translations.telegram_channel_name_input;
            }
            if (!telegramBotToken.value.trim()) {
                isValid = false;
                telegramBotToken.classList.add('is-invalid');
                document.getElementById('telegramBotTokenError').textContent = window.Translations.telegram_bot_token_input;
            }
            if (!telegramAdminCheck.checked) {
                isValid = false;
                telegramAdminCheck.classList.add('is-invalid');
                document.getElementById('telegramAdminCheckError').textContent = window.Translations.admin_enshures;
            }

            groupData = {
                platform: 'telegram',
                channelName: telegramChannelName.value.trim(),
                botToken: telegramBotToken.value.trim(),
                isAdmin: telegramAdminCheck.checked
            };
        }

        // Если данные не прошли валидацию, прерываем выполнение
        if (!isValid) {
            return;
        }

        // Отправляем данные на сервер через AJAX
        fetch('/add_group/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Получаем CSRF-токен для Django
            },
            body: JSON.stringify(groupData)
        })
        .then(response => response.json())
        .then(data => {
            // Закрываем модальное окно
            const modal = bootstrap.Modal.getInstance(document.getElementById('addGroupModal'));
            modal.hide();

            // Показываем уведомление об успехе
            showAlert(data.message, window.Translations.success_message);
        })
        .catch(error => {
            console.error(window.Translations.error_message, error);
            showAlert(window.Translations.group_adding_error, 'danger');
        });
    });
}

// Функция для очистки ошибок
function clearErrors() {
    const fields = [
        'vkGroupId', 'vkAdminCheck',
        'telegramChannelName', 'telegramBotToken', 'telegramAdminCheck'
    ];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.remove('is-invalid');
        }
        const errorDiv = document.getElementById(`${fieldId}Error`);
        if (errorDiv) {
            errorDiv.textContent = '';
        }
    });
}

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
