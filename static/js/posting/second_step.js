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

    function simulateAnalysisProcess(duration) {
        const analysisProgress = document.getElementById('analysisProgress');
        const analysisStatus = document.getElementById('analysisStatus');

        // Получение платформы из <p id="selectedGroupStats">
        const statsText = document.getElementById('selectedGroupStats').textContent.trim();
        const firstWord = statsText.split(/\s+/)[0].toLowerCase();

        // Установка коэффициента в зависимости от платформы
        let coefficient = 5000;
        if (firstWord === 'boosty') {
            coefficient = 6000;
        } else if (firstWord === 'telegram') {
            coefficient = 1000;
        } else if (firstWord === 'vk') {
            coefficient = 3000;
        }

        let progress = 0;
        const intervalTime = (duration * coefficient) / 20; // Используем определённый коэффициент

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

            if (progress >= 100) {
                clearInterval(interval);
                duringAnalysis.style.display = 'none';
                postAnalysis.style.display = 'block';
                step2NextBtn.style.display = 'block';
                renderTopics(generatedTopics);
            }
        }, intervalTime);
    }


    // Функция для рендеринга тем в postAnalysis
    function renderTopics(topics) {
        const topicsList = document.createElement('ul');
        topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = `${topic.title} (${topic.percent}%)`;
            topicsList.appendChild(li);
        });
        postAnalysis.innerHTML = '<h3>Результаты анализа</h3>'; // Очищаем содержимое
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
        resetAnalysis();
        // Здесь может быть дополнительная логика для перехода на шаг 1
    });
}
