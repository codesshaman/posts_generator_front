document.addEventListener('DOMContentLoaded', function() {
    // Переменные для работы с загрузкой изображения
    const imageDropArea = document.getElementById('imageDropArea');
    const imageInput = document.getElementById('postImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');
    const browseLink = document.querySelector('.browse-link');
    const suggestionImages = document.querySelectorAll('.suggestion-image');

    // Переменные для работы с хэштегами
    const tagsInput = document.getElementById('postTags');
    const tagsContainer = document.getElementById('tagsContainer');
    const tags = [];

    let totalCoins = 0;
    let remainingCoins = 0;
    // Переменные для работы с планированием публикации
    const schedulePostCheckbox = document.getElementById('schedulePost');
    const scheduleOptions = document.getElementById('scheduleOptions');
    const saveAsDraftCheckbox = document.getElementById('saveAsDraft');

    // Переменные для работы с предпросмотром
    const previewPostBtn = document.getElementById('previewPostBtn');
    const previewTitle = document.getElementById('previewTitle');
    const previewContent = document.getElementById('previewContent');
    const previewPostImage = document.getElementById('previewPostImage');
    const previewPlatformBadge = document.getElementById('previewPlatformBadge');
    const previewTags = document.getElementById('previewTags');
    const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));

    // Переменные для работы с генерацией ИИ
    const generateWithAIBtn = document.getElementById('generateWithAIBtn');
    if (generateWithAIBtn) {
        generateWithAIBtn.addEventListener('click', function() {
            aiGeneratorModal.show();
        });
    } else {
        console.error('Кнопка с ID "generateWithAIBtn" не найдена');
    }
    const aiGeneratorModal = new bootstrap.Modal(document.getElementById('aiGeneratorModal'));
    const generateBtn = document.getElementById('generateBtn');
    const aiPrompt = document.getElementById('aiPrompt');
    const aiLoading = document.getElementById('aiLoading');
    const aiResult = document.getElementById('aiResult');
    const aiResultContent = document.getElementById('aiResultContent');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const useGeneratedBtn = document.getElementById('useGeneratedBtn');
    const tokensUsed = document.getElementById('tokensUsed');

    // Переменные для работы с кнопками формы
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const publishPostBtn = document.getElementById('publishPostBtn');
    const publishFromPreviewBtn = document.getElementById('publishFromPreviewBtn');

    // Переменные для работы с редактором
    const editorButtons = document.querySelectorAll('.btn-editor');
    const contentEditor = document.getElementById('postContent');

    // Инициализация формы
    initForm();

    // Функция инициализации формы
    function initForm() {
        // Скрываем опции планирования по умолчанию
        scheduleOptions.style.display = 'none';

        // Скрываем предпросмотр изображения по умолчанию
        imagePreview.style.display = 'none';

        // Скрываем результат генерации ИИ по умолчанию
        aiResult.style.display = 'none';
        aiLoading.style.display = 'none';

        // Устанавливаем текущую дату и время для планирования
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' +
                       (now.getMinutes() + 30).toString().padStart(2, '0');

        document.getElementById('publishDate').value = dateStr;
        document.getElementById('publishTime').value = timeStr;
    }

    // Загружаем стартовые данные
    async function loadInitialTokens() {
        const response = await fetch('/get_initial_tokens/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            alert('Ошибка при получении стартовых токенов');
            return;
        }

        const data = await response.json();
        totalCoins = data.total_coins;
        remainingCoins = data.remaining;

        // Отображаем на странице
        tokensUsed.textContent = totalCoins - remainingCoins;
        document.querySelector('.token-usage .progress-bar').style.width =
            ((totalCoins - remainingCoins) / totalCoins * 100) + '%';
    }

    // Запускаем при загрузке
    loadInitialTokens();

    // Обработчики событий для загрузки изображения
    imageDropArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        imageDropArea.classList.add('dragover');
    });

    imageDropArea.addEventListener('dragleave', function() {
        imageDropArea.classList.remove('dragover');
    });

    imageDropArea.addEventListener('drop', function(e) {
        e.preventDefault();
        imageDropArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });

    browseLink.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleImageFile(this.files[0]);
        }
    });

    removeImageBtn.addEventListener('click', function() {
        imageInput.value = '';
        previewImg.src = '';
        imagePreview.style.display = 'none';
        document.querySelector('.image-upload-placeholder').style.display = 'flex';
    });

    // Обработчик для предложенных изображений
    suggestionImages.forEach(function(img) {
        img.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-src');
            previewImg.src = imgSrc;
            imagePreview.style.display = 'block';
            document.querySelector('.image-upload-placeholder').style.display = 'none';
        });
    });

    // Функция обработки загруженного изображения
    function handleImageFile(file) {
        // Проверка типа файла
        if (!file.type.match('image.*')) {
            alert('Пожалуйста, загрузите изображение');
            return;
        }

        // Проверка размера файла (5MB максимум)
        if (file.size > 5 * 1024 * 1024) {
            alert('Размер файла не должен превышать 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            imagePreview.style.display = 'block';
            document.querySelector('.image-upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }

    // Обработчики событий для хэштегов
    tagsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(this.value.trim());
            this.value = '';
        }
    });

    // Функция добавления хэштега
    function addTag(tag) {
        if (tag === '') return;

        // Удаляем # в начале, если он есть
        if (tag.startsWith('#')) {
            tag = tag.substring(1);
        }

        // Проверяем, что тег еще не добавлен
        if (tags.includes(tag)) return;

        // Добавляем тег в массив
        tags.push(tag);

        // Создаем элемент тега
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.innerHTML = `
            <span class="tag-text">#${tag}</span>
            <button type="button" class="btn-remove-tag" data-tag="${tag}">
                <i class="ph ph-x"></i>
            </button>
        `;

        // Добавляем тег в контейнер
        tagsContainer.appendChild(tagElement);

        // Добавляем обработчик для удаления тега
        tagElement.querySelector('.btn-remove-tag').addEventListener('click', function() {
            const tagToRemove = this.getAttribute('data-tag');
            removeTag(tagToRemove);
        });
    }

    // Функция удаления хэштега
    function removeTag(tag) {
        // Удаляем тег из массива
        const index = tags.indexOf(tag);
        if (index !== -1) {
            tags.splice(index, 1);
        }

        // Удаляем элемент тега из DOM
        const tagElements = document.querySelectorAll('.tag');
        tagElements.forEach(function(element) {
            if (element.querySelector('.btn-remove-tag').getAttribute('data-tag') === tag) {
                element.remove();
            }
        });
    }

    // Обработчик для чекбокса планирования
    schedulePostCheckbox.addEventListener('change', function() {
        if (this.checked) {
            scheduleOptions.style.display = 'block';
            saveAsDraftCheckbox.checked = false;
        } else {
            scheduleOptions.style.display = 'none';
        }
    });

    // Обработчик для чекбокса черновика
    saveAsDraftCheckbox.addEventListener('change', function() {
        if (this.checked) {
            schedulePostCheckbox.checked = false;
            scheduleOptions.style.display = 'none';
        }
    });

    // Обработчик для кнопки предпросмотра
    previewPostBtn.addEventListener('click', function() {
        updatePreview();
        previewModal.show();
    });

    // Функция обновления предпросмотра
    function updatePreview() {
        const title = document.getElementById('postTitle').value || 'Заголовок поста';
        const content = document.getElementById('postContent').value || 'Содержание поста будет отображаться здесь...';
        const platform = document.querySelector('input[name="platform"]:checked').value;

        previewTitle.textContent = title;
        previewContent.innerHTML = formatContent(content);

        // Устанавливаем платформу
        previewPlatformBadge.textContent = getPlatformName(platform);
        previewPlatformBadge.className = 'preview-platform-badge';
        previewPlatformBadge.classList.add('platform-' + platform);

        // Устанавливаем изображение
        if (previewImg.src) {
            previewPostImage.src = previewImg.src;
            document.getElementById('previewImageContainer').style.display = 'block';
        } else {
            document.getElementById('previewImageContainer').style.display = 'none';
        }

        // Устанавливаем хэштеги
        previewTags.innerHTML = '';
        tags.forEach(function(tag) {
            const tagSpan = document.createElement('span');
            tagSpan.classList.add('preview-tag');
            tagSpan.textContent = '#' + tag;
            previewTags.appendChild(tagSpan);
        });
    }

    // Функция форматирования контента для предпросмотра
    function formatContent(content) {
        // Заменяем переносы строк на <br>
        content = content.replace(/\n/g, '<br>');
        return content;
    }

    // Функция получения названия платформы
    function getPlatformName(platform) {
        switch(platform) {
            case 'linkedin': return 'LinkedIn';
            case 'facebook': return 'Facebook';
            case 'instagram': return 'Instagram';
            case 'twitter': return 'Twitter';
            default: return 'Неизвестно';
        }
    }

    // Обработчик для кнопки генерации в модальном окне
    generateBtn.addEventListener('click', async function() {
        const prompt = aiPrompt.value.trim();
        if (prompt === '') {
            alert('Пожалуйста, введите запрос для генерации');
            return;
        }

        // Функция для получения CSRF-токена из куки (стандартная для Django)
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

        // Отправка промпта на сервер Django через POST-запрос
        try {
            const response = await fetch('/generate_prompt/', {  // Замените '/generate_prompt/' на ваш реальный URL в Django
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  // Получение CSRF-токена для защиты (обязательно в Django)
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке запроса');
            }

            const data = await response.json();
            // Здесь можно обработать ответ, если нужно (без console.log)
            alert('Промпт успешно отправлен и выведен на сервере!');
        } catch (error) {
            // Без console.error
            alert('Произошла ошибка при отправке промпта');
        }

        // Показываем индикатор загрузки
        aiLoading.style.display = 'flex';
        aiResult.style.display = 'none';

        // Имитация запроса к API
        // Начинаем polling к серверу каждые 500 мс
        const pollingInterval = setInterval(async function() {
            try {
                const checkResponse = await fetch('/check_completion/', {  // Новый endpoint для проверки завершения
                    method: 'GET',  // Или POST, если нужно передавать данные (например, ID задачи)
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    }
                });

                if (!checkResponse.ok) {
                    throw new Error('Ошибка при проверке завершения');
                }

                const checkData = await checkResponse.json();

                if (checkData.completed) {
                    clearInterval(pollingInterval);  // Останавливаем polling

                    // Сохраняем оригинальную логику: генерируем контент локально
                    const generatedContent = await generateDummyContent(prompt);

                    // Обновляем счетчик токенов (теперь tokens приходят с сервера)
                    const tokensUsedNow = checkData.tokens;
                    remainingCoins = checkData.remaining;

                    tokensUsed.textContent = tokensUsedNow;
                    document.querySelector('.token-usage .progress-bar').style.width = (tokensUsedNow / totalCoins * 10) + '%';

                    // Отображаем результат
                    aiResultContent.innerHTML = generatedContent;
                    aiLoading.style.display = 'none';
                    aiResult.style.display = 'block';
                }
                // Если completed: false, продолжаем polling (ничего не делаем)
            } catch (error) {
                clearInterval(pollingInterval);  // Останавливаем при ошибке
                alert('Произошла ошибка при проверке завершения');
            }
        }, 500);  // Каждые 500 мс (0.5 секунды)
    });

    async function generateDummyContent(prompt) {
        const tone = document.getElementById('aiTone').value;
        const length = document.getElementById('aiLength').value;
        const platform = document.querySelector('input[name="platform"]:checked').value;

        try {
            const response = await fetch('/generate_one_post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(), // см. ниже
                },
                body: JSON.stringify({
                    prompt: prompt,
                    tone: tone,
                    length: length,
                    platform: platform
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при генерации контента');
            }

            const data = await response.json();

            if (data.status === 'success') {
                return data.content; // HTML-контент, уже готовый для вставки в DOM
            } else {
                throw new Error(data.message || 'Не удалось сгенерировать контент');
            }
        } catch (error) {
            console.error('Ошибка при генерации контента:', error);
            return `<div class="alert alert-danger">Ошибка: ${error.message}</div>`;
        }
    }

    // Вспомогательная функция для получения CSRF-токена из cookie
    function getCSRFToken() {
        const name = 'csrftoken';
        const cookies = document.cookie.split(';');

        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return '';
    }

    // Обработчик для кнопки "Использовать" сгенерированный контент
    useGeneratedBtn.addEventListener('click', function() {
        const generatedTitle = aiResultContent.querySelector('h4').textContent;
        const generatedContent = aiResultContent.querySelector('.ai-content-text').innerHTML.replace(/<br><br>/g, '\n\n');

        // Заполняем форму сгенерированными данными
        document.getElementById('postTitle').value = generatedTitle;
        document.getElementById('postContent').value = generatedContent.replace(/<br>/g, '\n');

        // Добавляем хэштеги
        const suggestedTags = aiResultContent.querySelectorAll('.ai-suggested-tags .preview-tag');
        suggestedTags.forEach(function(tag) {
            const tagText = tag.textContent.substring(1); // Убираем #
            addTag(tagText);
        });

        // Закрываем модальное окно
        aiGeneratorModal.hide();
    });

    // Обработчик для кнопки "Сгенерировать заново"
    regenerateBtn.addEventListener('click', function() {
        generateBtn.click();
    });

    // Обработчики для кнопок редактора
    editorButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            applyFormatting(action);
        });
    });

    // Функция применения форматирования к тексту
    function applyFormatting(action) {
        const textarea = document.getElementById('postContent');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let formattedText = '';

        switch(action) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'underline':
                formattedText = `_${selectedText}_`;
                break;
            case 'heading':
                formattedText = `## ${selectedText}`;
                break;
            case 'list-ul':
                formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
                break;
            case 'list-ol':
                formattedText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
                break;
            case 'link':
                const url = prompt('Введите URL:', 'https://');
                if (url) {
                    formattedText = `[${selectedText}](${url})`;
                } else {
                    return;
                }
                break;
            case 'image':
                // Открываем диалог выбора изображения
                imageInput.click();
                return;
            case 'emoji':
                // Простая реализация выбора эмодзи
                const emojis = ['😊', '👍', '🎉', '💡', '⭐', '🚀', '💼', '📊', '📈', '🔍'];
                const emojiList = emojis.map(emoji => `<button class="emoji-btn">${emoji}</button>`).join('');
                const emojiSelector = document.createElement('div');
                emojiSelector.className = 'emoji-selector';
                emojiSelector.innerHTML = emojiList;

                // Позиционируем селектор эмодзи
                const buttonRect = this.getBoundingClientRect();
                emojiSelector.style.top = (buttonRect.bottom + window.scrollY) + 'px';
                emojiSelector.style.left = (buttonRect.left + window.scrollX) + 'px';

                document.body.appendChild(emojiSelector);

                // Обработчики для кнопок эмодзи
                const emojiButtons = emojiSelector.querySelectorAll('.emoji-btn');
                emojiButtons.forEach(function(btn) {
                    btn.addEventListener('click', function() {
                        const emoji = this.textContent;
                        insertTextAtCursor(textarea, emoji);
                        emojiSelector.remove();
                    });
                });

                // Закрываем селектор при клике вне его
                document.addEventListener('click', function closeEmojiSelector(e) {
                    if (!emojiSelector.contains(e.target) && e.target !== document.querySelector('[data-action="emoji"]')) {
                        emojiSelector.remove();
                        document.removeEventListener('click', closeEmojiSelector);
                    }
                });

                return;
        }

        // Вставляем отформатированный текст
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        textarea.focus();
        textarea.selectionStart = start;
        textarea.selectionEnd = start + formattedText.length;
    }

    // Функция вставки текста в позицию курсора
    function insertTextAtCursor(textarea, text) {
        const start = textarea.selectionStart;
        textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(textarea.selectionEnd);
        textarea.focus();
        textarea.selectionStart = start + text.length;
        textarea.selectionEnd = start + text.length;
    }

    // Обработчик для кнопки "Сохранить черновик"
    saveDraftBtn.addEventListener('click', function() {
        savePost('draft');
    });

    // Обработчик для кнопки "Опубликовать"
    publishPostBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateForm()) {
            if (saveAsDraftCheckbox.checked) {
                savePost('draft');
            } else if (schedulePostCheckbox.checked) {
                savePost('scheduled');
            } else {
                savePost('published');
            }
        }
    });

    // Обработчик для кнопки "Опубликовать" в предпросмотре
    publishFromPreviewBtn.addEventListener('click', function() {
        if (validateForm()) {
            savePost('published');
            previewModal.hide();
        }
    });

    // Функция валидации формы
    function validateForm() {
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();

        if (title === '') {
            alert('Пожалуйста, введите заголовок поста');
            return false;
        }

        if (content === '') {
            alert('Пожалуйста, введите содержание поста');
            return false;
        }

        return true;
    }

    // Функция сохранения поста
    function savePost(status) {
        // Собираем данные формы
        const title = document.getElementById('postTitle').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const platform = document.querySelector('input[name="platform"]:checked').value;
        const image = previewImg.src;

        // Получаем дату публикации, если пост запланирован
        let publishDate = null;
        if (status === 'scheduled') {
            const date = document.getElementById('publishDate').value;
            const time = document.getElementById('publishTime').value;
            publishDate = new Date(`${date}T${time}`);

            // Проверяем, что дата в будущем
            if (publishDate <= new Date()) {
                alert('Дата публикации должна быть в будущем');
                return;
            }
        }

        // Создаем объект поста
        const post = {
            id: generateUniqueId(),
            title: title,
            content: content,
            platform: platform,
            image: image,
            tags: tags,
            status: status,
            publishDate: publishDate,
            createdAt: new Date(),
            allowComments: document.getElementById('enableComments').checked
        };

        // В реальном приложении здесь был бы AJAX-запрос к серверу
        // Для демонстрации просто сохраняем в localStorage
        savePostToLocalStorage(post);

        // Показываем уведомление об успешном сохранении
        showNotification(status);

        // Перенаправляем на страницу со списком постов через 2 секунды
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 2000);
    }

    // Функция генерации уникального ID
    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Функция сохранения поста в localStorage
    function savePostToLocalStorage(post) {
        // Получаем существующие посты
        let posts = JSON.parse(localStorage.getItem('posts')) || [];

        // Добавляем новый пост
        posts.push(post);

        // Сохраняем обновленный список
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    // Функция отображения уведомления
    function showNotification(status) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'notification';

        // Устанавливаем текст в зависимости от статуса
        let message = '';
        let icon = '';

        switch(status) {
            case 'published':
                message = 'Пост успешно опубликован!';
                icon = '<i class="ph ph-check-circle"></i>';
                notification.classList.add('notification-success');
                break;
            case 'draft':
                message = 'Черновик успешно сохранен!';
                icon = '<i class="ph ph-note-pencil"></i>';
                notification.classList.add('notification-info');
                break;
            case 'scheduled':
                message = 'Пост запланирован к публикации!';
                icon = '<i class="ph ph-clock"></i>';
                notification.classList.add('notification-info');
                break;
        }

        notification.innerHTML = `${icon} <span>${message}</span>`;

        // Добавляем уведомление на страницу
        document.body.appendChild(notification);

        // Показываем уведомление с анимацией
        setTimeout(function() {
            notification.classList.add('show');
        }, 10);

        // Скрываем уведомление через 2 секунды
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 2000);
    }
});