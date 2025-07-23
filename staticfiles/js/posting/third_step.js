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
            title: window.translations.topics.newTopic,
            description: window.translations.topics.newTopicDescription
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

document.getElementById('generateContentPlanBtn').addEventListener('click', function(event) {
    event.preventDefault();

    // Обновляем массив generatedTopics по текущим значениям в DOM
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach(item => {
        const topicId = parseInt(item.dataset.topicId);
        const topic = generatedTopics.find(t => t.id === topicId);
        if (topic) {
            topic.title = item.querySelector('.topic-title').value;
            topic.description = item.querySelector('.topic-description').value;
        }
    });

    // Формируем payload
    const payload = generatedTopics.map(topic => ({
        title: topic.title,
        description: topic.description
    }));

    // Отправляем на Django
    fetch('/view-content-plan/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({ topics: payload })
    })
    .then(response => {
        if (!response.ok) throw new Error(window.translations.alerts.dataSendErr);
        return response.json();
    })
    .then(data => {
        showAlert(window.translations.alerts.cpSendSuc + '!', 'success');
        console.log(window.translations.alerts.serverResp, data);
    })
    .catch(error => {
        showAlert(window.translations.alerts.dataSendErr + ': ' + error.message, 'danger');
    });
});

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
