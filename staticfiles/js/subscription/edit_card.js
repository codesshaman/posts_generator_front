document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('addPaymentMethodModal');
    const modalTitle = document.getElementById('addPaymentMethodModalLabel');
    const saveButton = document.getElementById('savePaymentMethodBtn');
    const form = document.getElementById('addPaymentMethodForm');

    // Переводы для заголовка
    const addTitle = window.translations.adding_payment_method;
    const editTitle = window.translations.edit_payment_method;
    const addButtonText = window.translations.save;
    const editButtonText = window.translations.save;

    // Обработчик для кнопок редактирования
    document.querySelectorAll('.edit-card-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Заполняем поля формы данными карты
            const cardId = this.getAttribute('data-card-id');
            const cardNumber = this.getAttribute('data-card-num');
            const validPeriod = this.getAttribute('data-valid-period');
            const cardholderName = this.getAttribute('data-cardholder-name');

            document.getElementById('cardId').value = cardId;
            document.getElementById('cardNumber').value = cardNumber;
            document.getElementById('expiryDate').value = validPeriod;
            document.getElementById('cardholderName').value = cardholderName;
            // CVV не заполняется, так как он не хранится в данных карты
            document.getElementById('cvv').value = '';

            // Меняем заголовок и текст кнопки для режима редактирования
            modalTitle.textContent = editTitle;
            saveButton.textContent = editButtonText;

            // Устанавливаем action формы для редактирования
            form.action = "{% url 'edit_payment_method' %}";
        });
    });

    // Сброс формы при открытии для добавления
    modal.addEventListener('show.bs.modal', function(event) {
        if (!event.relatedTarget || !event.relatedTarget.classList.contains('edit-card-btn')) {
            // Если модальное окно открыто не через кнопку редактирования, сбрасываем форму
            form.reset();
            document.getElementById('cardId').value = '';
            modalTitle.textContent = addTitle;
            saveButton.textContent = addButtonText;
            form.action = "{% url 'add_payment_method' %}";
        }
    });

    // Отправка формы через AJAX
    saveButton.addEventListener('click', function() {
        const formData = new FormData(form);
        const actionUrl = form.action;

        fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': form.querySelector('[name=csrfmiddlewaretoken]').value
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Закрываем модальное окно и перезагружаем страницу
                bootstrap.Modal.getInstance(modal).hide();
                window.location.reload();
            } else {
                // Показываем ошибку
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при сохранении карты.');
        });
    });
});
