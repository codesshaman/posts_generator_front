document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');

    if (!loadMoreBtn) return;

    let page = 1; // Текущая страница

    loadMoreBtn.addEventListener('click', function () {
        // Показываем спиннер и блокируем кнопку
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('d-none');
        loadingSpinner.classList.remove('d-none');

        // Имитация загрузки данных с сервера
        setTimeout(function () {
            // Здесь должен быть AJAX-запрос к серверу для получения новых постов
            // Например:
            // fetch('/api/posts?page=' + (++page))
            //   .then(response => response.json())
            //   .then(data => {
            //     if (data.posts.length > 0) {
            //       appendPosts(data.posts);
            //     }
            //     if (data.hasMore === false) {
            //       loadMoreBtn.remove(); // Удаляем кнопку, если больше нет постов
            //     }
            //   })
            //   .catch(error => console.error('Ошибка загрузки постов:', error))
            //   .finally(() => {
            //     loadMoreBtn.disabled = false;
            //     loadMoreBtn.classList.remove('d-none');
            //     loadingSpinner.classList.add('d-none');
            //   });

            // Для демонстрации добавляем клоны существующих постов
            const postsContainer = document.querySelector('.main-content');
            const existingPosts = document.querySelectorAll('.post-card');

            if (existingPosts.length > 0) {
                // Клонируем несколько существующих постов
                for (let i = 0; i < Math.min(3, existingPosts.length); i++) {
                    const postClone = existingPosts[i].cloneNode(true);
                    postsContainer.insertBefore(postClone, document.querySelector('.load-more-container'));
                }

                // Если это последняя страница, удаляем кнопку
                if (page >= 3) {
                    loadMoreBtn.remove();
                    loadingSpinner.remove();

                    // Добавляем сообщение о том, что больше постов нет
                    const endMessage = document.createElement('div');
                    endMessage.className = 'text-center text-muted my-5';
                    endMessage.innerHTML = 'Больше постов нет';
                    document.querySelector('.load-more-container').appendChild(endMessage);
                } else {
                    // Иначе разблокируем кнопку и скрываем спиннер
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.classList.remove('d-none');
                    loadingSpinner.classList.add('d-none');
                    page++;
                }
            } else {
                // Если постов нет, показываем сообщение
                const noPostsMessage = document.createElement('div');
                noPostsMessage.className = 'alert alert-info';
                noPostsMessage.textContent = 'Посты не найдены';
                postsContainer.appendChild(noPostsMessage);

                loadMoreBtn.remove();
                loadingSpinner.remove();
            }
        }, 1000); // Имитация задержки загрузки
    });

    // Функция для добавления новых постов
    function appendPosts(posts) {
        const postsContainer = document.querySelector('.main-content');

        posts.forEach(post => {
            // Создаем HTML для нового поста
            const postHTML = `
                <div class="card mb-4 post-card">
                    <div class="row g-0">
                        <div class="col-md-3 position-relative">
                            <img src="${post.image}" class="img-fluid rounded-start post-image" alt="${post.title}">
                            <span class="post-status status-${post.status}">${getStatusText(post.status)}</span>
                        </div>
                        <div class="col-md-9">
                            <div class="card-body d-flex flex-column h-100">
                                <div class="post-meta mb-2">
                                    <span class="platform-badge platform-${post.platform}">${getPlatformText(post.platform)}</span>
                                    <span class="post-time"><i class="ph ph-clock me-1"></i> ${post.date}</span>
                                </div>
                                <h5 class="card-title mb-2">${post.title}</h5>
                                <p class="card-text post-description">${post.description}</p>
                                <div class="post-actions mt-auto">
                                    <button class="btn-edit" data-post-id="${post.id}">Редактировать</button>
                                    <button class="btn-delete" data-post-id="${post.id}">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Вставляем HTML перед контейнером кнопки "Загрузить еще"
            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }

    // Вспомогательные функции для получения текста статуса и платформы
    function getStatusText(status) {
        switch (status) {
            case 'published': return 'Опубликовано';
            case 'draft': return 'Черновик';
            case 'queued': return 'В очереди';
            default: return 'Неизвестно';
        }
    }

    function getPlatformText(platform) {
        switch (platform) {
            case 'linkedin': return 'LinkedIn';
            case 'facebook': return 'Facebook';
            case 'instagram': return 'Instagram';
            case 'twitter': return 'Twitter';
            default: return 'Другое';
        }
    }
});
