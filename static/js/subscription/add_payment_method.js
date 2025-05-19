document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addPaymentMethodForm');
    const saveButton = document.getElementById('savePaymentMethodBtn');
    const inputs = form.querySelectorAll('input[required]');

    // Функция проверки номера карты по алгоритму Луна
    function isValidCardNumber(cardNumber) {
        // Удаляем пробелы и проверяем, что это только цифры
        const cleanNumber = cardNumber.replace(/\D/g, '');
        if (!/^\d{13,19}$/.test(cleanNumber)) {
            return false;
        }

        let sum = 0;
        let isEven = false;
        for (let i = cleanNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanNumber[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    }

    // Проверка срока действия (MM/YY, не истёк)
    function isValidExpiryDate(expiry) {
        const match = expiry.match(/^(\d{2})\/(\d{2})$/);
        if (!match) return false;

        const month = parseInt(match[1]);
        const year = parseInt(match[2]) + 2000; // Предполагаем 20XX
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        return month >= 1 && month <= 12 && year >= currentYear &&
               (year > currentYear || (year === currentYear && month >= currentMonth));
    }

    // Проверка CVV (3 или 4 цифры)
    function isValidCVV(cvv, cardNumber) {
        const cleanNumber = cardNumber.replace(/\D/g, '');
        const isAmEx = /^3[47]/.test(cleanNumber);
        const cvvPattern = isAmEx ? /^\d{4}$/ : /^\d{3}$/;
        return cvvPattern.test(cvv);
    }

    saveButton.addEventListener('click', function () {
        let isValid = true;
        const cardNumberInput = document.getElementById('cardNumber');
        const expiryDateInput = document.getElementById('expiryDate');
        const cvvInput = document.getElementById('cvv');
        const cardholderNameInput = document.getElementById('cardholderName');

        // Проверка обязательных полей
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        // Проверка номера карты
        if (cardNumberInput.value.trim()) {
            if (!isValidCardNumber(cardNumberInput.value)) {
                cardNumberInput.classList.add('is-invalid');
                isValid = false;
            }
        }

        // Проверка срока действия
        if (expiryDateInput.value.trim()) {
            if (!isValidExpiryDate(expiryDateInput.value)) {
                expiryDateInput.classList.add('is-invalid');
                isValid = false;
            }
        }

        // Проверка CVV
        if (cvvInput.value.trim()) {
            if (!isValidCVV(cvvInput.value, cardNumberInput.value)) {
                cvvInput.classList.add('is-invalid');
                isValid = false;
            }
        }

        // Если все проверки пройдены, отправляем форму
        if (isValid) {
            const formData = new FormData(form);

            fetch('/add-payment-method/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addPaymentMethodModal'));
                    modal.hide();
                    alert(data.message);
                } else {
                    alert(window.translations.error_processing_form + ': ' + (data.message || window.translations.unknown_error));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(window.translations.error_sending_form);
            });
        }
    });

    // Удаление класса is-invalid при вводе данных
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (input.value.trim()) {
                input.classList.remove('is-invalid');
            }
        });
    });

    // Функция для получения CSRF-токена
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
});
