// Функциональность управления контент-планом
function setupContentPlanManagement() {
    const contentPlanList = document.getElementById('contentPlanList');
    const generateContentPlanBtn = document.getElementById('generateContentPlanBtn');
    const regenerateContentPlanBtn = document.getElementById('regenerateContentPlanBtn');

    function pollGenerationStatus() {
        const interval = setInterval(() => {
            fetch('/check-generate-status/')
                .then(res => res.json())
                .then(data => {
                    if (data.status === true) {
                        clearInterval(interval);
                        generateContentPlan();
                        renderContentPlan();
                        hideLoading();
                    }
                });
        }, 500);
    }

    // Генерация контент-плана при переходе к шагу 4
    generateContentPlanBtn.addEventListener('click', () => {
        showLoading(window.translations.alerts.contPlanGen + '...');
        fetch('/check-generate-status/', { method: 'POST' })
            .then(() => pollGenerationStatus());
    });

    // Повторная генерация контент-плана
    regenerateContentPlanBtn.addEventListener('click', () => {
        showLoading(window.translations.alerts.contPlanGen + '...');
        fetch('/check-generate-status/', { method: 'POST' })
            .then(() => pollGenerationStatus());
    });

            // Генерация контент-плана на основе выбранных тем
            function generateContentPlan() {
                showLoading(window.translations.alerts.contPlanGen + '...');

                fetch('/generate-content-plan/')
                    .then(response => {
                        if (!response.ok) throw new Error(window.translations.alerts.cpLoadErr);
                        return response.json();
                    })
                    .then(data => {
                        window.contentPlan = data;  // глобально определяем contentPlan
                        renderContentPlan();        // вызываем твою функцию для отрисовки
                        hideLoading();
                        showAlert(window.translations.alerts.cplanLoad + '!', 'success');
                    })
            }


            // Отрисовка контент-плана
            function renderContentPlan() {
                contentPlanList.innerHTML = '';

                contentPlan.forEach((item, index) => {
                    const planItem = document.createElement('div');
                    planItem.className = 'content-plan-item mb-3';
                    planItem.dataset.itemId = item.id;

                    // Определение иконки платформы
                    let platformIcon = '';
                    let platformName = '';

                    if (item.platform === 'instagram') {
                        platformIcon = '<i class="ph ph-instagram-logo"></i>';
                        platformName = 'Instagram';
                    } else if (item.platform === 'facebook') {
                        platformIcon = '<i class="ph ph-facebook-logo"></i>';
                        platformName = 'Facebook';
                    } else if (item.platform === 'linkedin') {
                        platformIcon = '<i class="ph ph-linkedin-logo"></i>';
                        platformName = 'LinkedIn';
                    } else if (item.platform === 'twitter') {
                        platformIcon = '<i class="ph ph-twitter-logo"></i>';
                        platformName = 'Twitter';
                    }

                    planItem.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex align-items-center">
                                    <div class="drag-handle me-3">
                                        <i class="ph ph-dots-six-vertical"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <div class="d-flex align-items-center">
                                                <span class="badge bg-secondary me-2">${index + 1}</span>
                                                <input type="text" class="form-control plan-item-title" value="${item.title}">
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="platform-badge me-2" title="${platformName}">
                                                    ${platformIcon}
                                                </div>
                                                <button class="btn btn-sm btn-outline-danger ms-2 delete-plan-item-btn">
                                                    <i class="ph ph-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea class="form-control plan-item-description" rows="2">${item.description}</textarea>
                                    </div>
                                </div>
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" id="autoGenerateImages" checked>
                                    <label class="form-check-label" for="autoGenerateImages">
                                        Сгенерировать изображение
                                    </label>
                                </div>
                            </div>
                        </div>
                    `;

                    contentPlanList.appendChild(planItem);

                    // Обработчики событий для элементов контент-плана

                    // Обновление заголовка
                    planItem.querySelector('.plan-item-title').addEventListener('input', function() {
                        const itemId = parseInt(planItem.dataset.itemId);
                        const item = contentPlan.find(i => i.id === itemId);
                        if (item) {
                            item.title = this.value;
                        }
                    });

                    // Обновление описания
                    planItem.querySelector('.plan-item-description').addEventListener('input', function() {
                        const itemId = parseInt(planItem.dataset.itemId);
                        const item = contentPlan.find(i => i.id === itemId);
                        if (item) {
                            item.description = this.value;
                        }
                    });

                    // Удаление элемента контент-плана
                    planItem.querySelector('.delete-plan-item-btn').addEventListener('click', function() {
                        const itemId = parseInt(planItem.dataset.itemId);
                        contentPlan = contentPlan.filter(i => i.id !== itemId);
                        planItem.remove();
                    });
                });

                // Инициализация Sortable.js для перетаскивания элементов
                if (contentPlan.length > 0) {
                    new Sortable(contentPlanList, {
                        handle: '.drag-handle',
                        animation: 150,
                        onEnd: function(evt) {
                            // Обновление порядка элементов в массиве contentPlan
                            const newContentPlan = [];
                            document.querySelectorAll('.content-plan-item').forEach(item => {
                                const itemId = parseInt(item.dataset.itemId);
                                const planItem = contentPlan.find(i => i.id === itemId);
                                if (planItem) {
                                    newContentPlan.push(planItem);
                                }
                            });

                            contentPlan = newContentPlan;
                        }
                    });
                }
            }
        }
        let contentPlan = [];
        let generatedPosts = [];

        // Функциональность генерации постов
        function setupPostsGeneration() {
            const generatePostsBtn = document.getElementById('generatePostsBtn');
            const generatedPostsList = document.getElementById('generatedPostsList');
            const scheduleAllBtn = document.getElementById('scheduleAllBtn');
            const saveAllBtn = document.getElementById('saveAllBtn');

            // Загрузка контент-плана с сервера перед отрисовкой
            function loadContentPlanFromServer() {
                return fetch('/get-content-plan/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(window.translations.alerts.cpError + res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.status !== 'ok') {
                        throw new Error(data.error || window.translations.alerts.serverError);
                    }
                    contentPlan = data.contentPlan; // Обновляем contentPlan данными с сервера
                    console.log(window.translations.alerts.cplanLoad, contentPlan.length);
                    return data;
                });
            }

            // Вызов загрузки и отрисовки контент-плана
            loadContentPlanFromServer()
                .then(() => {
                    renderContentPlan(); // Отрисовываем контент-план после загрузки
                })

            // Генерация постов при переходе к шагу 5
            function pollPostGenerationStatus() {
                const interval = setInterval(() => {
                    fetch('/check-posts-status/')
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === true) {
                                clearInterval(interval);
                                generatePosts();
                                renderPosts();
                                hideLoading();
                            }
                        });
                }, 500);
            }

            function getCookie(name) {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
                return null;
            }

            // CSRF-токен из cookie
            function getCSRFToken() {
                const name = 'csrftoken';
                const cookies = document.cookie.split(';');
                for (let cookie of cookies) {
                    cookie = cookie.trim();
                    if (cookie.startsWith(name + '=')) {
                        return decodeURIComponent(cookie.slice(name.length + 1));
                    }
                }
                return '';
            }

            // Подстраховка: синхронизируем contentPlan с DOM перед отправкой
            function syncContentPlanFromDOM() {
                const items = document.querySelectorAll('.content-plan-item');
                items.forEach(el => {
                    const id = parseInt(el.dataset.itemId);
                    const obj = contentPlan.find(i => i.id === id);
                    if (obj) {
                        const titleInput = el.querySelector('.plan-item-title');
                        const descTextarea = el.querySelector('.plan-item-description');
                        if (titleInput) obj.title = titleInput.value;
                        if (descTextarea) obj.description = descTextarea.value;
                        const dateInput = el.querySelector('.publish-date');
                        if (dateInput && dateInput.value) obj.publishDate = dateInput.value;
                        const hashtagsInput = el.querySelector('.plan-item-hashtags');
                        if (hashtagsInput) obj.hashtags = hashtagsInput.value;
                    }
                });
            }

            function sendContentPlanToServer() {
                syncContentPlanFromDOM();

                return fetch('/receive-content-plan/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken')
                    },
                    body: JSON.stringify(contentPlan)
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(window.translations.alerts.networkError + res.status);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.status !== 'ok') {
                        throw new Error(data.error || window.translations.alerts.serverError);
                    }
                    console.log(window.translations.alerts.sendConPlan, data.count);
                    return data;
                });
            }

            generatePostsBtn.addEventListener('click', function() {
                showLoading(window.translations.alerts.submConPlan);
                sendContentPlanToServer()
                    .then(() => {
                        showLoading(window.translations.alerts.postsGen);
                        return fetch('/check-posts-status/', { method: 'POST' });
                    })
                    .then(() => {
                        pollPostGenerationStatus();
                    })
                    .catch(err => {
                        hideLoading();
                        showAlert(window.translations.alerts.failConPlan + err.message, 'danger');
                    });
            });

            scheduleAllBtn.addEventListener('click', function() {
                showLoading(window.translations.alerts.postsPlaning);
                setTimeout(() => {
                    showAlert(window.translations.alerts.postsShadul, 'success');
                    hideLoading();
                }, 1500);
            });

            saveAllBtn.addEventListener('click', function() {
                showLoading(window.translations.alerts.postsSaving);
                setTimeout(() => {
                    showAlert(window.translations.alerts.postsSucSave, 'success');
                    hideLoading();
                    setTimeout(() => {
                        window.location.href = 'scheduler';
                    }, 1500);
                }, 1500);
            });

            function generatePosts() {
                generatedPosts = [];
                contentPlan.forEach((item) => {
                    let postContent = '';

                    if (item.platform === 'instagram') {
                        postContent = generateInstagramPost(item.title, item.description);
                    } else if (item.platform === 'facebook') {
                        postContent = generateFacebookPost(item.title, item.description);
                    } else if (item => item.platform === 'linkedin') {
                        postContent = generateLinkedInPost(item.title, item.description);
                    } else if (item.platform === 'twitter') {
                        postContent = generateTwitterPost(item.title, item.description);
                    }

                    generatedPosts.push({
                        id: item.id, // Используем id из contentPlan
                        title: item.title,
                        content: postContent,
                        hashtags: item.hashtags || '',
                        platform: item.platform,
                        publishDate: item.publishDate,
                        image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`
                    });
                });
            }

            function renderPosts() {
                generatedPostsList.innerHTML = '';
                generatedPosts.forEach(post => {
                    const postCard = document.createElement('div');
                    postCard.className = 'col-md-6 mb-4';
                    postCard.dataset.postId = post.id;

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
                                <input type="hidden" class="post-id" value="${post.id}">
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

                    postCard.querySelector('.edit-post-btn').addEventListener('click', function() {
                        const postId = parseInt(postCard.dataset.postId);
                        const post = generatedPosts.find(p => p.id === postId);

                        if (post) {
                            document.getElementById('postTitle').value = post.title;
                            document.getElementById('postContent').value = post.content;
                            document.getElementById('postHashtags').value = post.hashtags;
                            document.getElementById('postPlatform').value = post.platform;

                            const dateParts = post.publishDate.split('.');
                            const publishDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            document.getElementById('postScheduleDate').value = publishDate.toISOString().split('T')[0];
                            document.getElementById('postScheduleTime').value = '12:00';
                            document.getElementById('postImage').src = post.image;

                            const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
                            editPostModal.show();

                            document.getElementById('savePostChanges').addEventListener('click', function () {
                                const formData = new FormData();
                                formData.append('id', post.id); // Добавляем id поста
                                formData.append('title', document.getElementById('postTitle').value);
                                formData.append('platform', document.getElementById('postPlatform').value);
                                formData.append('content', document.getElementById('postContent').value);
                                formData.append('hashtags', document.getElementById('postHashtags').value);
                                formData.append('schedule_date', document.getElementById('postScheduleDate').value);
                                formData.append('schedule_time', document.getElementById('postScheduleTime').value);

                                const imageFile = document.getElementById('postImageUpload').files[0];
                                if (imageFile) {
                                    formData.append('image', imageFile);
                                }

                                fetch('/save-post/', {
                                    method: 'POST',
                                    headers: {
                                        'X-CSRFToken': getCSRFToken(),
                                    },
                                    body: formData,
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(window.translations.alerts.serverResp, data);

                                    // Обновление данных поста
                                    post.title = document.getElementById('postTitle').value;
                                    post.content = document.getElementById('postContent').value;
                                    post.hashtags = document.getElementById('postHashtags').value;

                                    const newDate = document.getElementById('postScheduleDate').value;
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

                                    showAlert(window.translations.alerts.postSucUpd, 'success');
                                })
                                .catch(error => {
                                    console.error(window.translations.alerts.sendFormErr, error);
                                    showAlert(window.translations.alerts.dataSavingErr, 'danger');
                                });
                            }, { once: true }); // Слушатель события добавляется однократно
                        }
                    });

                    postCard.querySelector('.schedule-post-btn').addEventListener('click', function() {
                        const postId = parseInt(postCard.dataset.postId);
                        const post = generatedPosts.find(p => p.id === postId);

                        if (post) {
                            const dateParts = post.publishDate.split('.');
                            const publishDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            document.getElementById('scheduleDate').value = publishDate.toISOString().split('T')[0];
                            document.getElementById('scheduleTime').value = '12:00';
                            const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
                            scheduleModal.show();

                            document.getElementById('saveScheduleChanges').onclick = function() {
                                const newDate = document.getElementById('scheduleDate').value;
                                if (newDate) {
                                    const dateObj = new Date(newDate);
                                    post.publishDate = dateObj.toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    });
                                    postCard.querySelector('.publish-date').innerHTML = `<i class="ph ph-calendar me-1"></i> ${post.publishDate}`;
                                }
                                const scheduleModal = bootstrap.Modal.getInstance(document.getElementById('scheduleModal'));
                                scheduleModal.hide();
                                showAlert(window.translations.alerts.plannedFor + ' ' + post.publishDate, 'success');
                            };
                        }
                    });
                });
            }

            function generateInstagramPost(title, description) {
                return `${title}\n\n${description}\n\n`;
            }

            function generateFacebookPost(title, description) {
                return `${title}\n\n${description}\n\n`;
            }

            function generateLinkedInPost(title, description) {
                return `${title}\n\n${description}\n\n`;
            }

            function generateTwitterPost(title, description) {
                const maxLength = 280;
                let post = `${title}\n\n${description}`;
                if (post.length > maxLength) {
                    post = post.substring(0, maxLength - 3) + '...';
                }
                return post;
            }
        }

        // Настройка модальных окон
        function setupModals() {
            // Генерация изображения
            document.getElementById('generateImageBtn').addEventListener('click', function() {
                showLoading(window.translations.alerts.imageGen);

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
        function showLoading(message = window.translations.alerts.pleaseWait + '...') {
            const loadingOverlay = document.getElementById('loadingOverlay');
            const loadingMessage = document.getElementById('loadingMessage');

            loadingMessage.textContent = message;
            loadingOverlay.style.display = 'flex';
        }

        function hideLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            loadingOverlay.style.display = 'none';
        }
