const contentPlan = []; // Assuming this is shared or populated elsewhere
const generatedPosts = [];

function setupPostsGeneration() {
    const generatePostsBtn = document.getElementById('generatePostsBtn');
    const generatedPostsList = document.getElementById('generatedPostsList');
    const scheduleAllBtn = document.getElementById('scheduleAllBtn');
    const saveAllBtn = document.getElementById('saveAllBtn');

    // Генерация постов при переходе к шагу 5
    generatePostsBtn.addEventListener('click', function() {
        showLoading('Генерация постов...');

        // Имитация генерации постов
        setTimeout(() => {
            generatePosts();
            renderPosts();
            hideLoading();
        }, 3000);
    });

    // Запланировать все посты
    scheduleAllBtn.addEventListener('click', function() {
        showLoading('Планирование постов...');

        // Имитация планирования постов
        setTimeout(() => {
            showAlert('Все посты успешно запланированы', 'success');
            hideLoading();
        }, 1500);
    });

    // Сохранить все посты
    saveAllBtn.addEventListener('click', function() {
        showLoading('Сохранение постов...');

        // Имитация сохранения постов
        setTimeout(() => {
            showAlert('Все посты успешно сохранены', 'success');
            hideLoading();

            // Перенаправление на страницу с постами
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    });

    // Генерация постов на основе контент-плана
    function generatePosts() {
        generatedPosts.length = 0; // Clear the array

        // Генерация постов для каждого элемента контент-плана
        contentPlan.forEach((item, index) => {
            // Генерация текста поста в зависимости от платформы
            let postContent = '';
            let hashtags = '';

            if (item.platform === 'instagram') {
                postContent = generateInstagramPost(item.title, item.description);
                hashtags = generateHashtags(item.title);
            } else if (item.platform === 'facebook') {
                postContent = generateFacebookPost(item.title, item.description);
                hashtags = '';
            } else if (item.platform === 'linkedin') {
                postContent = generateLinkedInPost(item.title, item.description);
                hashtags = generateHashtags(item.title, 3);
            } else if (item.platform === 'twitter') {
                postContent = generateTwitterPost(item.title, item.description);
                hashtags = generateHashtags(item.title, 2);
            }

            // Создание объекта поста
            generatedPosts.push({
                id: Date.now() + index,
                title: item.title,
                content: postContent,
                hashtags: hashtags,
                platform: item.platform,
                publishDate: item.publishDate,
                image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`
            });
        });
    }

    // Отрисовка сгенерированных постов
    function renderPosts() {
        generatedPostsList.innerHTML = '';

        generatedPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'col-md-6 mb-4';
            postCard.dataset.postId = post.id;

            // Определение иконки платформы
            let platformIcon = '';
            let platformName = '';

            if (post.platform === 'instagram') {
                platformIcon = '<i class="ph ph-instagram-logo"></i>';
                platformName = 'Instagram';
            } else if (post.platform === 'facebook') {
                platformIcon = '<i class="ph ph-facebook-logo"></i>';
                platformName = 'Facebook';
            } else if (post.platform === 'linkedin') {
                platformIcon = '<i class="ph ph-linkedin-logo"></i>';
                platformName = 'LinkedIn';
            } else if (post.platform === 'twitter') {
                platformIcon = '<i class="ph ph-twitter-logo"></i>';
                platformName = 'Twitter';
            }

            postCard.innerHTML = `
                <div class="card h-100">
                    <img src="${post.image}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0">${post.title}</h5>
                            <div class="platform-badge" title="${platformName}">
                                ${platformIcon}
                            </div>
                        </div>
                        <p class="card-text post-content">${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
                        ${post.hashtags ? `<p class="card-text text-muted hashtags">${post.hashtags}</p>` : ''}
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div class="publish-date">
                                <i class="ph ph-calendar me-1"></i> ${post.publishDate}
                            </div>
                            <div>
                                <button class="btn btn-sm btn-outline-primary edit-post-btn me-1">
                                    <i class="ph ph-pencil"></i> Редактировать
                                </button>
                                <button class="btn btn-sm btn-outline-success schedule-post-btn">
                                    <i class="ph ph-calendar-plus"></i> Запланировать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            generatedPostsList.appendChild(postCard);

            // Редактирование поста
            postCard.querySelector('.edit-post-btn').addEventListener('click', function() {
                const postId = parseInt(postCard.dataset.postId);
                const post = generatedPosts.find(p => p.id === postId);

                if (post) {
                    // Заполнение формы редактирования поста
                    document.getElementById('postTitle').value = post.title;
                    document.getElementById('postContent').value = post.content;
                    document.getElementById('postHashtags').value = post.hashtags;
                    document.getElementById('postPlatform').value = post.platform;

                    // Разбор даты публикации
                    const dateParts = post.publishDate.split('.');
                    const publishDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                    document.getElementById('postScheduleDate').value = publishDate.toISOString().split('T')[0];
                    document.getElementById('postScheduleTime').value = '12:00';

                    // Установка изображения
                    document.getElementById('postImage').src = post.image;

                    // Открытие модального окна редактирования
                    const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
                    editPostModal.show();

                    // Обработчик сохранения изменений
                    document.getElementById('savePostChanges').onclick = function() {
                        // Обновление данных поста
                        post.title = document.getElementById('postTitle').value;
                        post.content = document.getElementById('postContent').value;
                        post.hashtags = document.getElementById('postHashtags').value;

                        // Обновление даты публикации
                        const newDate = document.getElementById('postScheduleDate').value;
                        const newTime = document.getElementById('postScheduleTime').value;

                        if (newDate) {
                            const dateObj = new Date(newDate);
                            post.publishDate = dateObj.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                        }

                        // Обновление карточки поста
                        postCard.querySelector('.card-title').textContent = post.title;
                        postCard.querySelector('.post-content').textContent = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');

                        if (post.hashtags) {
                            let hashtagsElement = postCard.querySelector('.hashtags');
                            if (hashtagsElement) {
                                hashtagsElement.textContent = post.hashtags;
                            } else {
                                const contentElement = postCard.querySelector('.post-content');
                                const hashtagsP = document.createElement('p');
                                hashtagsP.className = 'card-text text-muted hashtags';
                                hashtagsP.textContent = post.hashtags;
                                contentElement.after(hashtagsP);
                            }
                        } else {
                            const hashtagsElement = postCard.querySelector('.hashtags');
                            if (hashtagsElement) {
                                hashtagsElement.remove();
                            }
                        }

                        postCard.querySelector('.publish-date').innerHTML = `<i class="ph ph-calendar me-1"></i> ${post.publishDate}`;

                        // Закрытие модального окна
                        const editPostModal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
                        editPostModal.hide();

                        // Показать сообщение об успехе
                        showAlert('Пост успешно обновлен', 'success');
                    };
                }
            });

            // Планирование поста
            postCard.querySelector('.schedule-post-btn').addEventListener('click', function() {
                const postId = parseInt(postCard.dataset.postId);
                const post = generatedPosts.find(p => p.id === postId);

                if (post) {
                    // Разбор даты публикации
                    const dateParts = post.publishDate.split('.');
                    const publishDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                    document.getElementById('scheduleDate').value = publishDate.toISOString().split('T')[0];
                    document.getElementById('scheduleTime').value = '12:00';

                    // Открытие модального окна планирования
                    const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
                    scheduleModal.show();

                    // Обработчик сохранения изменений
                    document.getElementById('saveScheduleChanges').onclick = function() {
                        // Обновление даты публикации
                        const newDate = document.getElementById('scheduleDate').value;
                        const newTime = document.getElementById('scheduleTime').value;

                        if (newDate) {
                            const dateObj = new Date(newDate);
                            post.publishDate = dateObj.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });

                            // Обновление отображения даты публикации
                            postCard.querySelector('.publish-date').innerHTML = `<i class="ph ph-calendar me-1"></i> ${post.publishDate}`;
                        }

                        // Закрытие модального окна
                        const scheduleModal = bootstrap.Modal.getInstance(document.getElementById('scheduleModal'));
                        scheduleModal.hide();

                        // Показать сообщение об успехе
                        showAlert('Пост успешно запланирован на ' + post.publishDate, 'success');
                    };
                }
            });
        });
    }

    // Генерация текста поста для Instagram
    function generateInstagramPost(title, description) {
        return `📱 ${title}\n\n${description}\n\nЧто вы думаете об этом? Поделитесь своим мнением в комментариях! 👇`;
    }

    // Генерация текста поста для Facebook
    function generateFacebookPost(title, description) {
        return `${title}\n\n${description}\n\nА какой у вас опыт в этой сфере? Делитесь в комментариях!`;
    }

    // Генерация текста поста для LinkedIn
    function generateLinkedInPost(title, description) {
        return `${title}\n\n${description}\n\nКакие еще тренды вы заметили в этой области? Буду рад обсудить в комментариях.`;
    }

    // Генерация текста поста для Twitter
    function generateTwitterPost(title, description) {
        // Ограничение длины для Twitter
        const maxLength = 280;
        let post = `${title}\n\n${description}`;

        if (post.length > maxLength) {
            post = post.substring(0, maxLength - 3) + '...';
        }

        return post;
    }

    // Генерация хештегов
    function generateHashtags(title, count = 5) {
        // Список возможных хештегов
        const possibleHashtags = [
            '#маркетинг', '#smm', '#контентмаркетинг', '#бизнес', '#реклама',
            '#продвижение', '#digital', '#socialmedia', '#стратегия', '#брендинг',
            '#seo', '#аналитика', '#тренды', '#медиа', '#таргет'
        ];

        // Выбор случайных хештегов
        const hashtags = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * possibleHashtags.length);
            const hashtag = possibleHashtags[randomIndex];

            if (!hashtags.includes(hashtag)) {
                hashtags.push(hashtag);
            }
        }

        // Добавление хештега на основе заголовка
        const titleWords = title.split(' ');
        if (titleWords.length > 0) {
            const titleHashtag = '#' + titleWords[0].toLowerCase().replace(/[^а-яa-z0-9]/gi, '');
            if (!hashtags.includes(titleHashtag)) {
                hashtags.push(titleHashtag);
            }
        }

        return hashtags.join(' ');
    }
}

// Настройка модальных окон
function setupModals() {
    // Генерация изображения
    document.getElementById('generateImageBtn').addEventListener('click', function() {
        showLoading('Генерация изображения...');

        // Имитация генерации изображения
        setTimeout(() => {
            const randomId = Math.floor(Math.random() * 1000);
            document.getElementById('postImage').src = `https://via.placeholder.com/600x400?text=Generated_Image_${randomId}`;
            hideLoading();
        }, 1500);
    });

    // Загрузка изображения
    document.getElementById('postImageUpload').addEventListener('change', function(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                document.getElementById('postImage').src = e.target.result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    });
}

// Функции для работы с уведомлениями
function setupAlerts() {
    // Контейнер для уведомлений
    const alertsContainer = document.getElementById('alertsContainer');

    // Глобальная функция для показа уведомлений
    window.showAlert = function(message, type = 'info') {
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
    };
}

// Функции для работы с индикатором загрузки
function showLoading(message = 'Пожалуйста, подождите...') {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingMessage = document.getElementById('loadingMessage');

    loadingMessage.textContent = message;
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';
}
