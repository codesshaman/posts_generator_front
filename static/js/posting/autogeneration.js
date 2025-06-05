document.addEventListener('DOMContentLoaded', function() {
    // Инициализация компонентов Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Инициализация модальных окон
//    const addGroupModal = new bootstrap.Modal(document.getElementById('addGroupModal'));
    const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
    const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));

    // Переменные для хранения состояния
    let selectedGroupId = null;
    let generatedTopics = [];
    let contentPlan = [];
    let generatedPosts = [];

    // Настройка навигации по шагам
    setupStepNavigation();

    // Выбор группы
    setupGroupSelection();

    // Функциональность анализа
    setupAnalysisProcess();

    // Функциональность управления темами
    setupTopicsManagement();

    // Функциональность управления контент-планом
    setupContentPlanManagement();

    // Функциональность генерации постов
    setupPostsGeneration();

    // Настройка уведомлений
    setupAlerts();

    // Настройка модальных окон
    setupModals();
});

// Функциональность навигации по шагам
function setupStepNavigation() {
    // Обновление прогресс-бара
    function updateProgressBar(step) {
        const progressBar = document.getElementById('stepProgressBar');
        const percentage = (step - 1) * 20;
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);

        // Обновление активного шага в индикаторе прогресса
        document.querySelectorAll('.progress-step').forEach(el => {
            el.classList.remove('active');
            if (parseInt(el.dataset.step) <= step) {
                el.classList.add('active');
            }
        });
    }

    // Кнопки перехода к следующему шагу
    document.querySelectorAll('.btn-next-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.dataset.nextStep) - 1;
            const nextStep = parseInt(this.dataset.nextStep);
            
            // Скрыть текущий шаг
            document.getElementById(`step${currentStep}`).style.display = 'none';
            
            // Показать следующий шаг
            document.getElementById(`step${nextStep}`).style.display = 'block';
            
            // Обновить прогресс-бар
            updateProgressBar(nextStep);
        });
    });

    // Кнопки перехода к предыдущему шагу
    document.querySelectorAll('.btn-prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = parseInt(this.closest('.step-content').id.replace('step', ''));
            const prevStep = parseInt(this.dataset.prevStep);
            
            // Скрыть текущий шаг
            document.getElementById(`step${currentStep}`).style.display = 'none';
            
            // Показать предыдущий шаг
            document.getElementById(`step${prevStep}`).style.display = 'block';
            
            // Обновить прогресс-бар
            updateProgressBar(prevStep);
        });
    });
}

// Функциональность выбора группы
function setupGroupSelection() {
    const groupCards = document.querySelectorAll('.group-card:not(.add-group)');
    const addGroupCard = document.getElementById('addGroupCard');
    const step1NextBtn = document.getElementById('step1NextBtn');

    // Выбор группы
    groupCards.forEach(card => {
        card.addEventListener('click', function() {
            // Удалить класс selected со всех карточек
            groupCards.forEach(c => c.classList.remove('selected'));
            
            // Добавить класс selected к выбранной карточке
            this.classList.add('selected');
            
            // Сохранить ID выбранной группы
            selectedGroupId = this.dataset.groupId;
            
            // Показать кнопку "Далее"
            step1NextBtn.style.display = 'block';

            // Обновить информацию о выбранной группе на шаге 2
            updateSelectedGroupInfo(selectedGroupId);
        });
    });

    // Добавление новой группы
//    addGroupCard.addEventListener('click', function() {
//        const addGroupModal = new bootstrap.Modal(document.getElementById('addGroupModal'));
//        addGroupModal.show();
//    });

    // Сохранение новой группы
    document.getElementById('saveNewGroupBtn').addEventListener('click', function() {
        const groupName = document.getElementById('newGroupName').value;
        const groupUrl = document.getElementById('newGroupUrl').value;
        const groupPlatform = document.getElementById('newGroupPlatform').value;
        
        if (!groupName || !groupUrl) {
            showAlert('Пожалуйста, заполните все обязательные поля', 'danger');
            return;
        }
        
        // Создать новую карточку группы
        const newGroupId = Date.now(); // Использовать временную метку как ID
        const newGroupCard = createGroupCard(newGroupId, groupName, groupPlatform);
        
        // Добавить новую карточку группы в список
        const groupsList = document.getElementById('groupsList');
        groupsList.insertBefore(newGroupCard, addGroupCard.parentNode);
        
        // Закрыть модальное окно
//        const addGroupModal = bootstrap.Modal.getInstance(document.getElementById('addGroupModal'));
//        addGroupModal.hide();
        
        // Сбросить форму
        document.getElementById('addGroupForm').reset();
        
        // Показать сообщение об успехе
        showAlert('Группа успешно добавлена', 'success');
    });
}

// Создание элемента карточки группы
function createGroupCard(id, name, platform) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 mb-4';
    
    const platformMap = {
        'facebook': 'Facebook',
        'instagram': 'Instagram',
        'linkedin': 'LinkedIn',
        'twitter': 'Twitter'
    };
    
    const platformName = platformMap[platform] || platform;
    
    colDiv.innerHTML = `
        <div class="card group-card h-100" data-group-id="${id}">
            <img src="https://via.placeholder.com/300x150?text=${platformName}+Group" class="card-img-top" alt="${platformName} Group">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text text-muted">${platformName} • Подписчиков: 0</p>
            </div>
        </div>
    `;
    
    // Добавить обработчик клика на новую карточку
    const card = colDiv.querySelector('.group-card');
    card.addEventListener('click', function() {
        // Удалить класс selected со всех карточек
        document.querySelectorAll('.group-card:not(.add-group)').forEach(c => c.classList.remove('selected'));
        
        // Добавить класс selected к выбранной карточке
        this.classList.add('selected');
        
        // Сохранить ID выбранной группы
        selectedGroupId = this.dataset.groupId;
        
        // Показать кнопку "Далее"
        document.getElementById('step1NextBtn').style.display = 'block';

        // Обновить информацию о выбранной группе на шаге 2
        updateSelectedGroupInfo(selectedGroupId);
    });
    
    return colDiv;
}

// Обновление информации о выбранной группе на шаге 2
function updateSelectedGroupInfo(groupId) {
    const selectedCard = document.querySelector(`.group-card[data-group-id="${groupId}"]`);
    
    if (selectedCard) {
        const groupName = selectedCard.querySelector('.card-title').textContent;
        const groupStats = selectedCard.querySelector('.card-text').textContent;
        const groupImage = selectedCard.querySelector('img').src;
        const platformText = groupStats.split('•')[0].trim(); // Получаем platform_text из текста

        document.getElementById('selectedGroupName').textContent = groupName;
        document.getElementById('selectedGroupStats').textContent = groupStats;
        document.getElementById('selectedGroupImage').src = groupImage;

        // Заполняем скрытые поля
        document.getElementById('selectedGroupId').value = groupId;
        document.getElementById('selectedPlatformText').value = platformText;
    }
}

document.getElementById('step1NextBtn').addEventListener('click', function() {
    const groupId = document.getElementById('selectedGroupId').value;
    const platformText = document.getElementById('selectedPlatformText').value;

    fetch('/process-group-selection/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({
            group_id: groupId,
            platform_text: platformText
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ответ от сервера:', data);
        // Далее переход или обновление интерфейса
    })
    .catch(error => {
        console.error('Ошибка при отправке:', error);
    });
});

// Получение CSRF-токена
function getCSRFToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return '';
}

// Функциональность процесса анализа
function setupAnalysisProcess() {
    const startAnalysisBtn = document.getElementById('startAnalysisBtn');
    const preAnalysis = document.getElementById('preAnalysis');
    const duringAnalysis = document.getElementById('duringAnalysis');
    const postAnalysis = document.getElementById('postAnalysis');
    const step2NextBtn = document.getElementById('step2NextBtn');
    
    startAnalysisBtn.addEventListener('click', function() {
        // Скрыть блок перед анализом
        preAnalysis.style.display = 'none';
        
        // Показать блок во время анализа
        duringAnalysis.style.display = 'block';
        
        // Имитировать процесс анализа
        simulateAnalysisProcess();
    });
    
    function simulateAnalysisProcess() {
        const analysisProgress = document.getElementById('analysisProgress');
        const analysisStatus = document.getElementById('analysisStatus');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 5;
            analysisProgress.style.width = `${progress}%`;
            analysisProgress.setAttribute('aria-valuenow', progress);
            
            // Обновить текст статуса
            if (progress < 30) {
                analysisStatus.textContent = 'Анализ постов группы...';
            } else if (progress < 60) {
                analysisStatus.textContent = 'Определение основных тем...';
            } else if (progress < 90) {
                analysisStatus.textContent = 'Анализ активности аудитории...';
            } else {
                analysisStatus.textContent = 'Завершение анализа...';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Скрыть блок во время анализа
                duringAnalysis.style.display = 'none';
                
                // Показать блок после анализа
                postAnalysis.style.display = 'block';
                
                // Показать кнопку "Далее"
                step2NextBtn.style.display = 'block';
                
                // Сгенерировать темы для шага 3
                generateTopics();
            }
        }, 200);
    }
}

// Генерация тем на основе анализа
function generateTopics() {
    // Примерные темы на основе выбранной группы
    const selectedCard = document.querySelector(`.group-card[data-group-id="${selectedGroupId}"]`);
    const groupName = selectedCard ? selectedCard.querySelector('.card-title').textContent : '';
    
    // Генерация тем на основе названия группы
    if (groupName.includes('Маркетинг')) {
        generatedTopics = [
            { id: 1, title: 'Тренды в digital-маркетинге 2023', description: 'Обзор основных трендов в digital-маркетинге в 2023 году' },
            { id: 2, title: 'Эффективные стратегии SMM', description: 'Как разработать эффективную стратегию продвижения в социальных сетях' },
            { id: 3, title: 'Контент-маркетинг для бизнеса', description: 'Как использовать контент-маркетинг для привлечения клиентов' },
            { id: 4, title: 'Email-маркетинг: лучшие практики', description: 'Советы по созданию эффективных email-рассылок' },
            { id: 5, title: 'SEO-оптимизация в 2023 году', description: 'Актуальные методы SEO-оптимизации сайтов' }
        ];
    } else if (groupName.includes('Дизайн')) {
        generatedTopics = [
            { id: 1, title: 'Тренды в дизайне интерьера 2023', description: 'Обзор основных трендов в дизайне интерьера в 2023 году' },
            { id: 2, title: 'Минимализм в интерьере', description: 'Как создать стильный минималистичный интерьер' },
            { id: 3, title: 'Цветовые решения для маленьких помещений', description: 'Как визуально увеличить пространство с помощью цвета' },
            { id: 4, title: 'Экологичные материалы в интерьере', description: 'Обзор экологичных материалов для современного интерьера' },
            { id: 5, title: 'Освещение в интерьере', description: 'Как правильно организовать освещение в разных комнатах' }
        ];
    } else if (groupName.includes('IT')) {
        generatedTopics = [
            { id: 1, title: 'Тренды в разработке ПО 2023', description: 'Обзор основных трендов в разработке программного обеспечения в 2023 году' },
            { id: 2, title: 'Искусственный интеллект в бизнесе', description: 'Как компании используют ИИ для оптимизации процессов' },
            { id: 3, title: 'Кибербезопасность для бизнеса', description: 'Основные угрозы и методы защиты информации' },
            { id: 4, title: 'Облачные технологии', description: 'Преимущества использования облачных технологий для бизнеса' },
            { id: 5, title: 'Мобильная разработка', description: 'Тренды в разработке мобильных приложений' }
        ];
    } else {
        generatedTopics = [
            { id: 1, title: 'Тема 1', description: 'Описание темы 1' },
            { id: 2, title: 'Тема 2', description: 'Описание темы 2' },
            { id: 3, title: 'Тема 3', description: 'Описание темы 3' },
            { id: 4, title: 'Тема 4', description: 'Описание темы 4' },
            { id: 5, title: 'Тема 5', description: 'Описание темы 5' }
        ];
    }
}

// Функциональность управления темами
function setupTopicsManagement() {
    const topicsList = document.getElementById('topicsList');
    const addTopicBtn = document.getElementById('addTopicBtn');
    
    // Отрисовка тем при переходе к шагу 3
    document.querySelector('.btn-next-step[data-next-step="3"]').addEventListener('click', function() {
        renderTopics();
    });
    
    // Добавление новой темы
    addTopicBtn.addEventListener('click', function() {
        const newTopicId = Date.now();
        generatedTopics.push({
            id: newTopicId,
            title: 'Новая тема',
            description: 'Описание новой темы'
        });
        
        renderTopics();
        
        // Фокус на заголовке новой темы для редактирования
        setTimeout(() => {
            const newTopicTitle = document.querySelector(`.topic-item[data-topic-id="${newTopicId}"] .topic-title`);
            if (newTopicTitle) {
                newTopicTitle.focus();
                newTopicTitle.select();
            }
        }, 100);
    });
    
    // Отрисовка тем
    function renderTopics() {
        topicsList.innerHTML = '';
        
        generatedTopics.forEach(topic => {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item mb-3';
            topicItem.dataset.topicId = topic.id;
            
            topicItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <input type="text" class="form-control topic-title" value="${topic.title}" placeholder="Название темы">
                            <button class="btn btn-sm btn-outline-danger ms-2 delete-topic-btn">
                                <i class="ph ph-trash"></i>
                            </button>
                        </div>
                        <textarea class="form-control topic-description" rows="2" placeholder="Описание темы">${topic.description}</textarea>
                    </div>
                </div>
            `;
            
            topicsList.appendChild(topicItem);
            
            // Кнопка удаления темы
            topicItem.querySelector('.delete-topic-btn').addEventListener('click', function() {
                const topicId = parseInt(topicItem.dataset.topicId);
                generatedTopics = generatedTopics.filter(t => t.id !== topicId);
                topicItem.remove();
            });
            
            // Обновление темы при изменении ввода
            topicItem.querySelector('.topic-title').addEventListener('input', function() {
                const topicId = parseInt(topicItem.dataset.topicId);
                const topic = generatedTopics.find(t => t.id === topicId);
                if (topic) {
                    topic.title = this.value;
                }
            });
            
            topicItem.querySelector('.topic-description').addEventListener('input', function() {
                const topicId = parseInt(topicItem.dataset.topicId);
                const topic = generatedTopics.find(t => t.id === topicId);
                if (topic) {
                    topic.description = this.value;
                }
            });
        });
    }
}

// Функциональность управления контент-планом
function setupContentPlanManagement() {
    const contentPlanList = document.getElementById('contentPlanList');
    const generateContentPlanBtn = document.getElementById('generateContentPlanBtn');
    const regenerateContentPlanBtn = document.getElementById('regenerateContentPlanBtn');
    
    // Генерация контент-плана при переходе к шагу 4
    generateContentPlanBtn.addEventListener('click', function() {
        showLoading('Генерация контент-плана...');
        
                // Имитация генерации контент-плана
                setTimeout(() => {
                    generateContentPlan();
                    renderContentPlan();
                    hideLoading();
                }, 2000);
            });
            
            // Повторная генерация контент-плана
            regenerateContentPlanBtn.addEventListener('click', function() {
                showLoading('Генерация нового контент-плана...');
                
                // Имитация повторной генерации контент-плана
                setTimeout(() => {
                    generateContentPlan();
                    renderContentPlan();
                    hideLoading();
                }, 2000);
            });
            
            // Генерация контент-плана на основе выбранных тем
            function generateContentPlan() {
                contentPlan = [];
                
                // Получение текущей даты
                const currentDate = new Date();
                
                // Генерация постов для каждой темы
                generatedTopics.forEach((topic, index) => {
                    // Создание даты публикации (каждые 2 дня)
                    const publishDate = new Date(currentDate);
                    publishDate.setDate(publishDate.getDate() + index * 2);
                    
                    // Форматирование даты
                    const formattedDate = publishDate.toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    
                    // Создание элемента контент-плана
                    contentPlan.push({
                        id: Date.now() + index,
                        title: topic.title,
                        description: topic.description,
                        publishDate: formattedDate,
                        platform: index % 2 === 0 ? 'instagram' : 'facebook'
                    });
                });
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
                                                <select class="form-select form-select-sm platform-select" style="width: auto;">
                                                    <option value="instagram" ${item.platform === 'instagram' ? 'selected' : ''}>Instagram</option>
                                                    <option value="facebook" ${item.platform === 'facebook' ? 'selected' : ''}>Facebook</option>
                                                    <option value="linkedin" ${item.platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                                                    <option value="twitter" ${item.platform === 'twitter' ? 'selected' : ''}>Twitter</option>
                                                </select>
                                                <div class="date-picker-container ms-2">
                                                    <input type="text" class="form-control form-control-sm publish-date" value="${item.publishDate}" readonly>
                                                    <i class="ph ph-calendar"></i>
                                                </div>
                                                <button class="btn btn-sm btn-outline-danger ms-2 delete-plan-item-btn">
                                                    <i class="ph ph-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea class="form-control plan-item-description" rows="2">${item.description}</textarea>
                                    </div>
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
                    
                    // Обновление платформы
                    planItem.querySelector('.platform-select').addEventListener('change', function() {
                        const itemId = parseInt(planItem.dataset.itemId);
                        const item = contentPlan.find(i => i.id === itemId);
                        if (item) {
                            item.platform = this.value;
                            
                            // Обновление иконки платформы
                            const platformBadge = planItem.querySelector('.platform-badge');
                            if (this.value === 'instagram') {
                                platformBadge.innerHTML = '<i class="ph ph-instagram-logo"></i>';
                                platformBadge.title = 'Instagram';
                            } else if (this.value === 'facebook') {
                                platformBadge.innerHTML = '<i class="ph ph-facebook-logo"></i>';
                                platformBadge.title = 'Facebook';
                            } else if (this.value === 'linkedin') {
                                platformBadge.innerHTML = '<i class="ph ph-linkedin-logo"></i>';
                                platformBadge.title = 'LinkedIn';
                            } else if (this.value === 'twitter') {
                                platformBadge.innerHTML = '<i class="ph ph-twitter-logo"></i>';
                                platformBadge.title = 'Twitter';
                            }
                        }
                    });
                    
                    // Выбор даты публикации
                    planItem.querySelector('.date-picker-container').addEventListener('click', function() {
                        // Здесь можно добавить код для открытия календаря
                        // Для простоты просто увеличим дату на 1 день
                        const itemId = parseInt(planItem.dataset.itemId);
                        const item = contentPlan.find(i => i.id === itemId);
                        if (item) {
                            const dateParts = item.publishDate.split('.');
                            const currentDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            currentDate.setDate(currentDate.getDate() + 1);
                            
                            item.publishDate = currentDate.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                            
                            planItem.querySelector('.publish-date').value = item.publishDate;
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
        
        // Функциональность генерации постов
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
                generatedPosts = [];
                
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
