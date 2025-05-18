document.addEventListener('DOMContentLoaded', function () {
    const deleteLinks = document.querySelectorAll('.delete-card');
    const confirmButton = document.getElementById('confirmDeleteButton');

    deleteLinks.forEach(link => {
        link.addEventListener('click', function () {
            const cardId = this.getAttribute('data-card-id');
            const cardType = this.getAttribute('data-card-type');
            const cardNum = this.getAttribute('data-card-num');
            confirmButton.setAttribute('href', `/card/delete/${cardId}/`);
            confirmButton.setAttribute('data-card-id', cardId);
            confirmButton.setAttribute('data-card-type', cardType);
            confirmButton.setAttribute('data-card-num', cardNum);
        });
    });

    confirmButton.addEventListener('click', function () {
        const cardId = this.getAttribute('data-card-id');
        const cardType = this.getAttribute('data-card-type');
        const cardNum = this.getAttribute('data-card-num');
        // Функция-заглушка для логирования удаления
        logCardDeletion(cardId, cardType, cardNum);
    });
});
