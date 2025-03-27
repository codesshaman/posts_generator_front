document.addEventListener('DOMContentLoaded', function() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const loadingSpinner = document.getElementById('loadingSpinner');

        if (!loadMoreBtn) return;

        let page = 0; // Текущая страница

        loadMoreBtn.addEventListener('click', function() {
            // Показываем спиннер и блокируем кнопку
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add('d-none');
            loadingSpinner.classList.remove('d-none');

        page += 1; // Увеличиваем страницу
        fetch(`/load-more-posts/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.posts.length > 0) {
                    appendPosts(data.posts);
                }
                if (!data.has_more) {
                    loadMoreBtn.remove();
                    loadingSpinner.remove();
                    const endMessage = document.createElement('div');
                    endMessage.className = 'card mb-4 post-card text-center';
                    endMessage.innerHTML = window.translations.noMorePostsText;
                    document.querySelector('.load-more-container').appendChild(endMessage);
                } else {
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.classList.remove('d-none');
                    loadingSpinner.classList.add('d-none');
                }
            })
            .catch(error => console.error('Ошибка загрузки:', error));
            // Имитация загрузки данных с сервера
            setTimeout(function() {}, 1000); // Имитация задержки загрузки
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
            switch(status) {
                case 'published': return 'Опубликовано';
                case 'draft': return 'Черновик';
                case 'queued': return 'В очереди';
                default: return 'Неизвестно';
            }
        }

        function getPlatformText(platform) {
            switch(platform) {
                case 'linkedin': return 'LinkedIn';
                case 'facebook': return 'Facebook';
                case 'instagram': return 'Instagram';
                case 'twitter': return 'Twitter';
                default: return 'Другое';
            }
        }
    });
