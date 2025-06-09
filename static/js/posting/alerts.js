const setupAlerts = () => {
    const alertsContainer = document.getElementById('alertsContainer');
    window.showAlert = (message, type = 'info') => {
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
        setTimeout(() => {
            const alert = document.getElementById(`alert-${alertId}`);
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    };
};

export { setupAlerts };
