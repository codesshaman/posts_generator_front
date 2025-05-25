document.addEventListener('DOMContentLoaded', function() {
    const cancelSubscriptionBtn = document.getElementById('cancelSubscriptionBtn');
    const confirmCancelSubscriptionBtn = document.getElementById('confirmCancelSubscriptionBtn');
    const cancellationReason = document.getElementById('cancellationReason');
    const otherReasonContainer = document.getElementById('otherReasonContainer');
    const subscriptionStatusBadge = document.getElementById('subscriptionStatusBadge');

    // Функция для получения текущей даты в формате DD.MM.YYYY
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Функция для показа уведомлений
    function showAlert(message, type) {
        // Здесь можно использовать любую библиотеку для уведомлений, например, Bootstrap Toast
        alert(message); // Временная заглушка
    }

    // Обработчик для кнопки отмены/возобновления подписки
    if (cancelSubscriptionBtn) {
        cancelSubscriptionBtn.addEventListener('click', function() {
            const isCancelled = cancelSubscriptionBtn.classList.contains('btn-outline-success');
            if (!isCancelled) {
                // Показываем модальное окно для отмены
                const modal = new bootstrap.Modal(document.getElementById('cancelSubscriptionModal'));
                modal.show();
            } else {
                // Возобновляем подписку
                fetch('/manage-subscription/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                    },
                    body: JSON.stringify({ action: 'renew' })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        subscriptionStatusBadge.classList.remove('bg-warning');
                        subscriptionStatusBadge.classList.add(data.badge_class);
                        subscriptionStatusBadge.textContent = data.new_status;
                        cancelSubscriptionBtn.classList.remove('btn-outline-success');
                        cancelSubscriptionBtn.classList.add(data.button_class);
                        cancelSubscriptionBtn.innerHTML = `<i class="ph ph-x me-2"></i> ${data.button_text}`;
                        showAlert(data.message, 'success');
                    } else {
                        showAlert(data.message, 'danger');
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    showAlert('Произошла ошибка при возобновлении подписки', 'danger');
                });
            }
        });
    }

    // Обработчик для подтверждения отмены подписки
    if (confirmCancelSubscriptionBtn) {
        confirmCancelSubscriptionBtn.addEventListener('click', function() {
            const reason = cancellationReason.value;
            let reasonText = '';
            if (reason === 'too_expensive') {
                reasonText = '{{ too_expensive }}';
            } else if (reason === 'not_using') {
                reasonText = '{{ not_use_service }}';
            } else if (reason === 'missing_features') {
                reasonText = '{{ missing_features }}';
            } else if (reason === 'found_alternative') {
                reasonText = '{{ found_alternative }}';
            } else if (reason === 'other') {
                reasonText = document.getElementById('otherReason').value || 'Другое';
            }

            // Закрываем модальное окно
            const modal = bootstrap.Modal.getInstance(document.getElementById('cancelSubscriptionModal'));
            modal.hide();

            // Отправляем запрос на сервер
            fetch('/manage-subscription/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({
                    action: 'cancel',
                    reason: reasonText,
                    cancellation_date: getCurrentDate()
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    subscriptionStatusBadge.classList.remove('bg-success');
                    subscriptionStatusBadge.classList.add(data.badge_class);
                    subscriptionStatusBadge.textContent = data.new_status;
                    cancelSubscriptionBtn.classList.remove('btn-outline-danger');
                    cancelSubscriptionBtn.classList.add(data.button_class);
                    cancelSubscriptionBtn.innerHTML = `<i class="ph ph-arrows-clockwise me-2"></i> ${data.button_text}`;
                    showAlert(data.message, 'info');
                } else {
                    showAlert(data.message, 'danger');
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                showAlert('Произошла ошибка при отмене подписки', 'danger');
            });
        });
    }

    // Показ поля для другой причины отмены
    if (cancellationReason && otherReasonContainer) {
        cancellationReason.addEventListener('change', function() {
            otherReasonContainer.style.display = this.value === 'other' ? 'block' : 'none';
        });
    }
});
