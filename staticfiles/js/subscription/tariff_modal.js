document.addEventListener("DOMContentLoaded", function () {
    const updateButtons = document.querySelectorAll(".update-btn");
    const switchInput = document.getElementById("billingPeriodSwitch");

    // Получаем переводы из window.translations
    const monthText = window.translations.month;
    const yearText = window.translations.year;
    const monthlyText = window.translations.monthly;
    const annuallyText = window.translations.annually;
    const currencyText = window.translations.currency || '₽';

    // Функция для форматирования даты в ДД.ММ.ГГГГ
    function formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    }

    // Функция для расчета следующей даты списания
    function getNextBillingDate(period) {
        const today = new Date();
        let nextDate;
        let periodNum;
        if (period === monthText) {
            nextDate = new Date(today.setMonth(today.getMonth() + 1));
            periodNum = 0;
        } else {
            nextDate = new Date(today.setFullYear(today.getFullYear() + 1));
            periodNum = 1;
        }
        return {
            date: nextDate.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            periodNum: periodNum
        };
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
        }, 3000);
    }

    // Функция для получения CSRF-токена из cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Обработчик клика по кнопкам обновления тарифа
    updateButtons.forEach(button => {
        button.addEventListener("click", function () {
            const planName = this.dataset.tariffName;
            const useAnnual = switchInput.checked;
            const price = parseFloat(useAnnual ? this.dataset.yearly : this.dataset.monthly);
            const period = useAnnual ? yearText : monthText;
            const periodText = useAnnual ? annuallyText : monthlyText;
            const nextBilling = getNextBillingDate(period);

            // Обновляем содержимое модального окна
            document.getElementById("modalPlanName").textContent = `${window.translations.your_choose_plan} "${planName}"`;
            document.getElementById("modalPrice").textContent = `${price} ${currencyText}/${period}`;
            document.getElementById("modalPeriod").textContent = periodText;
            document.getElementById("modalNextBillingDate").textContent = nextBilling.date;

            // Сохраняем данные в data-атрибутах модального окна
            const modal = document.getElementById("planConfirmationModal");
            modal.dataset.planName = planName;
            modal.dataset.price = price;
            modal.dataset.period = period;
            modal.dataset.periodNum = nextBilling.periodNum;
            modal.dataset.nextBillingDate = nextBilling.date;

            // Инициализируем и показываем модальное окно
            try {
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            } catch (error) {
                console.error("Ошибка при инициализации модального окна:", error);
            }
        });
    });

    // Обработчик для кнопки подтверждения
    const confirmButton = document.getElementById("confirmPlanUpdateBtn");
    if (confirmButton) {
        confirmButton.addEventListener("click", function () {
            const modal = document.getElementById("planConfirmationModal");
            const planName = modal.dataset.planName || "Неизвестный тариф";
            const price = modal.dataset.price;
            const period = modal.dataset.period;
            const periodNum = modal.dataset.periodNum;
            const nextBillingDate = modal.dataset.nextBillingDate;

            // Отправляем данные на сервер
            fetch('/update-tariff/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    tariff_name: planName,
                    price: price,
                    period: periodNum,
                    next_billing_date: nextBillingDate
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Ответ от сервера:", data);
                // Закрываем модальное окно
                try {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    } else {
                        console.warn("Модальное окно не инициализировано");
                    }
                } catch (error) {
                    console.error("Ошибка при закрытии модального окна:", error);
                }
                // Показываем уведомление об успешном обновлении
                showAlert(`Тариф успешно обновлен до "${planName}"`, 'success');
            })
            .catch(error => {
                console.error("Ошибка при отправке данных на сервер:", error);
                showAlert("Ошибка при обновлении тарифа", 'danger');
            });
        });
    } else {
        console.error("Кнопка confirmPlanUpdateBtn не найдена");
    }
});
