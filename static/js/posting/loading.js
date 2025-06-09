const showLoading = (message = 'Пожалуйста, подождите...') => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.textContent = message;
    loadingOverlay.style.display = 'flex';
};

const hideLoading = () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';
};

export { showLoading, hideLoading };
