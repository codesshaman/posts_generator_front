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
        let progress = 0;
        const intervalTime = (duration * 1000) / 20; // Разбиваем время на 20 шагов

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
            }
        }, intervalTime);
    }
}
