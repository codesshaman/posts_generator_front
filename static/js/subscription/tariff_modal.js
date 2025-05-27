document.addEventListener("DOMContentLoaded", function () {
    const updateButtons = document.querySelectorAll(".update-btn");
    const switchInput = document.getElementById("billingPeriodSwitch");

    // Получаем переводы из window.translations
    const monthText = window.translations.month;
    const yearText = window.translations.year;
    const monthlyText = window.translations.monthly;
    const annuallyText = window.translations.annually;
    const currencyText = window.translations.currency || '₽'; // Значение по умолчанию, если currency не определена

    // Функция для расчета следующей даты списания
    function getNextBillingDate(period) {
        const today = new Date();
        let nextDate;
        if (period === monthText) {
            nextDate = new Date(today.setMonth(today.getMonth() + 1));
        } else {
            nextDate = new Date(today.setFullYear(today.getFullYear() + 1));
        }
        return nextDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Функция для показа уведомления
    function showAlert(message, type) {
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        setTimeout(() => {
            const alert = document.querySelector('.alert');
            if (alert) {
                alert.remove();
            }
        }, 3000); // Удаляем уведомление через 3 секунды
    }

    // Обработчик клика по кнопкам обновления тарифа
    updateButtons.forEach(button => {
        button.addEventListener("click", function () {
            const planName = this.dataset.tariffName;
            const useAnnual = switchInput.checked;
            const price = useAnnual ? this.dataset.yearly : this.dataset.monthly;
            const period = useAnnual ? yearText : monthText;
            const periodText = useAnnual ? annuallyText : monthlyText;

            // Обновляем содержимое модального окна
            document.getElementById("modalPlanName").textContent = `Вы выбрали тариф "${planName}"`;
            document.getElementById("modalPrice").textContent = `${price} ${currencyText}/${period}`;
            document.getElementById("modalPeriod").textContent = periodText;
            document.getElementById("modalNextBillingDate").textContent = getNextBillingDate(period);

            // Сохраняем planName в data-атрибуте модального окна
            document.getElementById("planConfirmationModal").dataset.planName = planName;

            // Инициализируем и показываем модальное окно
            try {
                const modal = new bootstrap.Modal(document.getElementById("planConfirmationModal"));
                modal.show();
            } catch (error) {
                console.error("Ошибка при инициализации модального окна:", error);
            }
        });
    });

    // Обработчик для кнопки подтверждения
    const confirmButton = document.getElementById("confirmPlanUpdateBtn");
    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
            // Получаем planName из data-атрибута модального окна
            const planName = document.getElementById("planConfirmationModal").dataset.planName || "Неизвестный тариф";
            try {
                const modal = bootstrap.Modal.getInstance(document.getElementById("planConfirmationModal"));
                if (modal) {
                    modal.hide();
                } else {
                    console.warn("Модальное окно не инициализировано");
                }
            } catch (error) {
                console.error("Ошибка при закрытии модального окна:", error);
            }

            // Показываем уведомление об успешном обновлении
            showAlert(`Тариф успешно обновлен до "${planName}"`, 'success');
        });
    } else {
        console.error("Кнопка confirmPlanUpdateBtn не найдена");
    }
});
