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

