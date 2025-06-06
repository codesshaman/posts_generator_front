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

// Отправка данных группы на сервер
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
