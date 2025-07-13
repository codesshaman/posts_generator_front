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
    const step2NextBtn2 = document.getElementById('step2NextBtn2');

    startAnalysisBtn.addEventListener('click', function() {
        // Скрыть блок перед анализом
        preAnalysis.style.display = 'none';

        // Показать блок во время анализа
        duringAnalysis.style.display = 'block';

        // Запрос тем с сервера
        fetch('/get-group-topics/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify({
                group_id: selectedGroupId // Передаем ID выбранной группы
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Сохраняем темы из ответа сервера
                generatedTopics = data.topics;
                // Запускаем эмуляцию анализа с указанным временем
                simulateAnalysisProcess(data.analysis_duration);
            } else {
                console.error('Ошибка при получении тем:', data.message);
                duringAnalysis.style.display = 'none';
                preAnalysis.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error);
            duringAnalysis.style.display = 'none';
            preAnalysis.style.display = 'block';
        });
    });

    // Новая функция для мгновенного получения и отображения тем
    step2NextBtn2.addEventListener('click', function() {
        // Скрыть блок перед анализом
        preAnalysis.style.display = 'none';
        duringAnalysis.style.display = 'none';
        postAnalysis.style.display = 'block';
        step2NextBtn.style.display = 'block';

        // Запрос тем с сервера
        fetch('/get-group-topics/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify({
                group_id: selectedGroupId // Передаем ID выбранной группы
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Сохраняем темы из ответа сервера
                generatedTopics = data.topics;
                // Мгновенно отображаем темы
                renderTopics(generatedTopics);
            } else {
                console.error('Ошибка при получении тем:', data.message);
                postAnalysis.style.display = 'none';
                preAnalysis.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error);
            postAnalysis.style.display = 'none';
            preAnalysis.style.display = 'block';
        });
    });

    function simulateAnalysisProcess(duration) {
        const analysisProgress = document.getElementById('analysisProgress');
        const analysisStatus = document.getElementById('analysisStatus');
        let progress = 0;

        duringAnalysis.style.display = 'block';

        const interval = setInterval(() => {
            progress += 5;
            analysisProgress.style.width = `${progress}%`;
            analysisProgress.setAttribute('aria-valuenow', progress);

            if (progress < 30) {
                analysisStatus.textContent = window.translations.analysis.analyzingPosts;
            } else if (progress < 60) {
                analysisStatus.textContent = window.translations.analysis.definingTopics;
            } else if (progress < 90) {
                analysisStatus.textContent = window.translations.analysis.analyzingAudience;
            } else {
                analysisStatus.textContent = window.translations.analysis.finishing;
            }

            if (progress >= 100) progress = 95; // "заморозим" на 95%, пока сервер не подтвердит завершение
        }, 500);

        // Начать опрос сервера на завершение
        pollAnalysisStatus()
            .then(() => {
                clearInterval(interval);
                analysisProgress.style.width = `100%`;
                analysisProgress.setAttribute('aria-valuenow', 100);
                analysisStatus.textContent = window.translations.analysis.complete;

                duringAnalysis.style.display = 'none';
                postAnalysis.style.display = 'block';
                step2NextBtn.style.display = 'block';
                renderTopics(generatedTopics);
            })
            .catch(err => {
                clearInterval(interval);
                console.error('Ошибка анализа:', err);
            });
    }

    // Опрос Django-сервера каждые 0.5 секунды
    async function pollAnalysisStatus() {
        const MAX_RETRIES = 120; // таймаут 1 минута
        let retries = 0;

        while (retries < MAX_RETRIES) {
            const response = await fetch('/check-analysis-status/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                }
            });

            const data = await response.json();
            if (data.status === true) {
                return true;
            }

            retries++;
            await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 сек
        }

        throw new Error('Превышено время ожидания завершения анализа');
    }

    // Функция для рендеринга тем в postAnalysis
    function renderTopics(topics) {
        const topicsList = document.createElement('ul');
        topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = `${topic.title} (${topic.percent}%)`;
            topicsList.appendChild(li);
        });
        postAnalysis.innerHTML = `<h3>${window.translations.analysis.analysis_results}</h3>`; // Используем перевод
        postAnalysis.appendChild(topicsList);
    }

    // Функция для сброса состояния анализа
    function resetAnalysis() {
        // Очистить массив тем
        generatedTopics = [];

        // Сбросить видимость блоков
        preAnalysis.style.display = 'block';
        duringAnalysis.style.display = 'none';
        postAnalysis.style.display = 'none';

        // Сбросить прогресс-бар
        const analysisProgress = document.getElementById('analysisProgress');
        const analysisStatus = document.getElementById('analysisStatus');
        analysisProgress.style.width = '0%';
        analysisProgress.setAttribute('aria-valuenow', 0);
        analysisStatus.textContent = '';

        // Скрыть кнопку "Далее"
        step2NextBtn.style.display = 'none';

        // Очистить содержимое postAnalysis
        postAnalysis.innerHTML = '';
    }

    // Обработчик кнопки "Назад"
    const prevStepBtn = document.querySelector('.btn-prev-step[data-prev-step="1"]');
    prevStepBtn.addEventListener('click', function() {
        // Сначала запрос на API
        fetch('/check-reset/')
            .then(response => response.json())
            .then(data => {
                if (data.allow_reset) {
                    // Только если API разрешил сброс — показываем confirm
                    const confirmed = alert(window.translations.analysis.reset);
                    if (confirmed) {
                        resetAnalysis();
                        showStep1();
                    }
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}
