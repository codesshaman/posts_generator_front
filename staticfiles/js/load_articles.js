document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const postsContainer = document.getElementById('articles-list');

    if (!loadMoreBtn) return;

    let page = 0; // Начнем с первой подгрузки (page=1)

    loadMoreBtn.addEventListener('click', function () {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('d-none');
        loadingSpinner.classList.remove('d-none');

        page += 1; // Увеличиваем страницу
        fetch(`/load-more-articles/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                if (data.articles.length > 0) {
                    appendPosts(data.articles);
                }
                if (!data.has_more) {
                    loadMoreBtn.remove();
                    loadingSpinner.remove();
                    const endMessage = document.createElement('div');
                    endMessage.className = 'card mb-4 post-card text-center';
                    endMessage.innerHTML = `${window.translations.loadMoreText}`;
                    document.querySelector('.load-more-container').appendChild(endMessage);
                } else {
                    loadMoreBtn.disabled = false;
                    loadMoreBtn.classList.remove('d-none');
                    loadingSpinner.classList.add('d-none');
                }
            })
            .catch(error => console.error('Ошибка загрузки:', error));
    });

    function appendPosts(posts) {
        posts.forEach(post => {
            const postHTML = `
                <div class="card mb-4 post-card">
                    <div class="row g-0">
                        <div class="col-md-3 position-relative">
                            <img src="${post.image}" class="img-fluid rounded-start post-image" alt="Изображение поста">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body d-flex flex-column h-100">
                                <div class="post-meta mb-2">
                                    <span class="platform-badge platform-instagram">${post.category_id}</span>
                                    <span class="post-time">
                                        <i class="ph ph-clock me-1"></i>
                                        ${window.translations.PublishText}${post.publish_date}
                                    </span>
                                </div>
                                <h5 class="card-title mb-2">${post.title}</h5>
                                <p class="card-text post-description">${post.description}</p>
                                <div class="post-actions mt-auto">
                                    <button class="btn-read">${window.translations.readButton}</button>
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
