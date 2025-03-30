document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-list');
    const deleteModalElement = document.getElementById('deleteConfirmModal');

    if (!postsContainer) {
        console.error('Контейнер #posts-list не найден');
        return;
    }
    if (!deleteModalElement) {
        console.error('Модальное окно подтверждения удаления не найдено');
        return;
    }

    let deleteModal;
    try {
        deleteModal = new bootstrap.Modal(deleteModalElement);
    } catch (error) {
        console.error('Ошибка при инициализации модального окна:', error);
        return;
    }

    let postToDelete = null;

    // Делегирование событий для кнопок удаления
    postsContainer.addEventListener('click', function(event) {
        const button = event.target.closest('.btn-delete');
        if (!button) return; // Если клик не по кнопке удаления, выходим

        event.preventDefault();

        postToDelete = button.closest('.post-card');
        if (!postToDelete) {
            console.error('Не удалось найти родительскую карточку поста');
            return;
        }

        const postTitle = postToDelete.querySelector('.card-title')?.textContent || 'этот пост';
        const confirmMessage = document.getElementById('deleteConfirmMessage');
        if (confirmMessage) {
            confirmMessage.textContent = `Вы действительно хотите удалить "${postTitle}"?`;
        }

        deleteModal.show();
    });

    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (!confirmDeleteBtn) {
        console.error('Кнопка подтверждения удаления не найдена');
        return;
    }

    confirmDeleteBtn.addEventListener('click', function() {
        if (postToDelete) {
            animateAndRemovePost(postToDelete);
        }
        deleteModal.hide();
    });

    function animateAndRemovePost(postElement) {
        postElement.style.transition = 'all 0.3s ease';
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            postElement.remove();
        }, 300);
    }
});