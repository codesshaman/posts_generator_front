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

    postsContainer.addEventListener('click', function(event) {
        const button = event.target.closest('.btn-delete');
        if (!button) return;

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
        if (!postToDelete) return;

        const postId = postToDelete.querySelector('.btn-delete').getAttribute('data-post-id');
        if (!postId || postId === 'unknown') {
            console.error('ID поста не определен или некорректен');
            alert('Ошибка: не удалось определить пост для удаления');
            return;
        }

        // Отправляем AJAX-запрос на сервер
        fetch(`/delete-post/${postId}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value, // CSRF-токен
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                animateAndRemovePost(postToDelete); // Удаляем из DOM после успешного ответа
            } else {
                throw new Error(data.message || 'Неизвестная ошибка');
            }
        })
        .catch(error => {
            console.error('Ошибка при удалении:', error);
            alert('Не удалось удалить пост: ' + error.message);
        })
        .finally(() => {
            deleteModal.hide();
        });
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
