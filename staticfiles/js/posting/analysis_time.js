// Перед вызовом анализа отправляем данные и получаем нужную длительность
function fetchPlatformDurationAndStartAnalysis(groupId, platformText) {
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
        if (data.status === 'ok') {
            window.analysisConfig = {
                baseDurationMs: data.base_analysis_duration_ms
            };

            // Запускаем анализ после получения настройки
            setupAnalysisProcess();
        } else {
            console.error('Ошибка при получении времени анализа:', data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка при запросе времени анализа:', error);
    });
}
