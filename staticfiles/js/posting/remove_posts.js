document.addEventListener('DOMContentLoaded', function() {
          // Получаем модальное окно
          const deleteModalElement = document.getElementById('deleteConfirmModal');

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

          // Получаем все кнопки удаления
          const deleteButtons = document.querySelectorAll('.btn-delete');

          if (deleteButtons.length === 0) {
            console.warn('Кнопки удаления не найдены');
          }

          // Переменная для хранения ссылки на пост, который нужно удалить
          let postToDelete = null;

          // Добавляем обработчик события для каждой кнопки удаления
          deleteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
              e.preventDefault();

              // Сохраняем ссылку на родительский элемент поста
              postToDelete = this.closest('.post-card');

              if (!postToDelete) {
                console.error('Не удалось найти родительскую карточку поста');
                return;
              }

              // Можно также получить заголовок поста для отображения в модальном окне
              const postTitle = postToDelete.querySelector('.card-title')?.textContent || 'этот пост';
              const confirmMessage = document.getElementById('deleteConfirmMessage');

              if (confirmMessage) {
                confirmMessage.textContent = `Вы действительно хотите удалить "${postTitle}"?`;
              }

              // Открываем модальное окно
              deleteModal.show();
            });
          });

          // Обработчик для кнопки подтверждения удаления
          const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

          if (!confirmDeleteBtn) {
            console.error('Кнопка подтверждения удаления не найдена');
            return;
          }

          confirmDeleteBtn.addEventListener('click', function() {
            // Здесь можно добавить AJAX-запрос для удаления поста на сервере
            // const postId = postToDelete.querySelector('.btn-edit')?.dataset.postId;

            // fetch('/api/posts/' + postId, {
            //   method: 'DELETE',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content
            //   }
            // })
            // .then(response => {
            //   if (!response.ok) {
            //     throw new Error('Ошибка при удалении поста');
            //   }
            //   return response.json();
            // })
            // .then(data => {
            //   // Удаляем пост из DOM с анимацией
            //   animateAndRemovePost(postToDelete);
            // })
            // .catch(error => {
            //   console.error('Ошибка:', error);
            //   alert('Не удалось удалить пост. Пожалуйста, попробуйте еще раз.');
            // })
            // .finally(() => {
            //   // Закрываем модальное окно
            //   deleteModal.hide();
            // });

            // Для демонстрации просто удаляем элемент из DOM с анимацией
            if (postToDelete) {
              animateAndRemovePost(postToDelete);
            }

            // Закрываем модальное окно
            deleteModal.hide();
          });

          // Функция для анимации удаления поста
          function animateAndRemovePost(postElement) {
            // Добавляем плавную анимацию исчезновения
            postElement.style.transition = 'all 0.3s ease';
            postElement.style.opacity = '0';
            postElement.style.transform = 'translateY(20px)';

            // Удаляем элемент после завершения анимации
            setTimeout(() => {
              postElement.remove();
            }, 300);
          }
     });
