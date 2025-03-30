document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const postsContainer = document.getElementById('posts-list'); // Предполагаем, что это контейнер для постов

    if (!loadMoreBtn) return;

    let page = 0;

    // Делегирование событий для кнопок редактирования и удаления
    postsContainer.addEventListener('click', function(event) {
        const target = event.target;

        // Обработка клика по кнопке "Edit"
        if (target.classList.contains('btn-edit')) {
            const postId = target.getAttribute('data-post-id');
            console.log(`Редактировать пост с ID: ${postId}`);
            // Здесь добавьте логику редактирования, например, открытие модального окна
        }

        // Обработка клика по кнопке "Delete"
        if (target.classList.contains('btn-delete')) {
            const postId = target.getAttribute('data-post-id');
            console.log(`Удалить пост с ID: ${postId}`);
            // Здесь добавьте логику удаления, например, подтверждение и запрос на сервер
        }
    });

    // Логика подгрузки постов
    loadMoreBtn.addEventListener('click', function() {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('d-none');
        loadingSpinner.classList.remove('d-none');

        page += 1;
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
    });

    // Функция для добавления новых постов
    function appendPosts(posts) {
        posts.forEach(post => {
            const postHTML = `
                <div class="card mb-4 post-card">
                    <div class="row g-0">
                        <div class="col-md-3 position-relative">
                            <img src="${post.image}" class="img-fluid rounded-start post-image" alt="${post.title}">
                            <span class="post-status ${post.category_style}">${post.category_text}</span>
                        </div>
                        <div class="col-md-9">
                            <div class="card-body d-flex flex-column h-100">
                                <div class="post-meta mb-2">
                                    <span class="platform-badge ${post.platform_style}">${post.platform_text}</span>
                                    <span class="post-time"><i class="ph ph-clock me-1"></i>
                                        ${window.translations.PublishText}: ${post.publish_date}
                                    </span>
                                </div>
                                <h5 class="card-title mb-2">${post.title}</h5>
                                <p class="card-text post-description">${post.description}</p>
                                <div class="post-actions mt-auto">
                                    <button class="btn-edit" data-post-id="${post.id || 'unknown'}">${window.translations.editButton}</button>
                                    <button class="btn-delete" data-post-id="${post.id || 'unknown'}">${window.translations.deleteButton}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            postsContainer.insertAdjacentHTML('beforeend', postHTML);
        });
    }
});
