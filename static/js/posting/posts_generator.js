const setupPostsGeneration = () => {
    const generatePostsBtn = document.getElementById('generatePostsBtn');
    const generatedPostsList = document.getElementById('generatedPostsList');
    const scheduleAllBtn = document.getElementById('scheduleAllBtn');
    const saveAllBtn = document.getElementById('saveAllBtn');

    generatePostsBtn.addEventListener('click', () => {
        showLoading('Генерация постов...');
        setTimeout(() => {
            generatePosts();
            renderPosts();
            hideLoading();
        }, 3000);
    });

    scheduleAllBtn.addEventListener('click', () => {
        showLoading('Планирование постов...');
        setTimeout(() => {
            showAlert('Все посты успешно запланированы', 'success');
            hideLoading();
        }, 1500);
    });

    saveAllBtn.addEventListener('click', () => {
        showLoading('Сохранение постов...');
        setTimeout(() => {
            showAlert('Все посты успешно сохранены', 'success');
            hideLoading();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    });

    const generatePosts = () => {
        window.generatedPosts = [];
        window.contentPlan.forEach((item, index) => {
            let postContent = '';
            let hashtags = '';
            if (item.platform === 'instagram') {
                postContent = generateInstagramPost(item.title, item.description);
                hashtags = generateHashtags(item.title);
            } else if (item.platform === 'facebook') {
                postContent = generateFacebookPost(item.title, item.description);
                hashtags = '';
            } else if (item.platform === 'linkedin') {
                postContent = generateLinkedInPost(item.title, item.description);
                hashtags = generateHashtags(item.title, 3);
            } else if (item.platform === 'twitter') {
                postContent = generateTwitterPost(item.title, item.description);
                hashtags = generateHashtags(item.title, 2);
            }

            window.generatedPosts.push({
                id: Date.now() + index,
                title: item.title,
                content: postContent,
                hashtags: hashtags,
                platform: item.platform,
                publishDate: item.publishDate,
                image: `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`
            });
        });
    };

    const renderPosts = () => {
        generatedPostsList.innerHTML = '';
        window.generatedPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'col-md-6 mb-4';
            postCard.dataset.postId = post.id;

            let platformIcon = '';
            let platformName = '';
            if (post.platform === 'instagram') {
                platformIcon = '<i class="ph ph-instagram-logo"></i>';
                platformName = 'Instagram';
            } else if (post.platform === 'facebook') {
                platformIcon = '<i class="ph ph-facebook-logo"></i>';
                platformName = 'Facebook';
            } else if (post.platform === 'linkedin') {
                platformIcon = '<i class="ph ph-linkedin-logo"></i>';
                platformName = 'LinkedIn';
            } else if (post.platform === 'twitter') {
                platformIcon = '<i class="ph ph-twitter-logo"></i>';
                platformName = 'Twitter';
            }

            postCard.innerHTML = `
                <div class="card h-100">
                    <img src="${post.image}" class="card-img-top" alt="${post.title}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0">${post.title}</h5>
                            <div class="platform-badge" title="${platformName}">
                                ${platformIcon}
                            </div>
                        </div>
                        <p class="card-text post-content">${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}</p>
                        ${post.hashtags ? `<p class="card-text text-muted hashtags">${post.hashtags}</p>` : ''}
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div class="publish-date">
                                <i class="ph ph-calendar me-1"></i> ${post.publishDate}
                            </div>
                            <div>
                                <button class="btn btn-sm btn-outline-primary edit-post-btn me-1">
                                    <i class="ph ph-pencil"></i> Редактировать
                                </button>
                                <button class="btn btn-sm btn-outline-success schedule-post-btn">
                                    <i class="ph ph-calendar-plus"></i> Запланировать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            generatedPostsList.appendChild(postCard);

            postCard.querySelector('.edit-post-btn').addEventListener('click', () => {
                const postId = parseInt(postCard.dataset.postId);
                const post = window.generatedPosts.find(p => p.id === postId);
                if (post) {
                    document.getElementById('postTitle').value = post.title;
                    document.getElementById('postContent').value = post.content;
                    document.getElementById('postHashtags').value = post.hashtags;
                    document.getElementById('postPlatform').value = post.platform;
                    const dateParts = post.publishDate.split('.');
                    const publishDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                    document.getElementById('postScheduleDate').value = publishDate.toISOString().split('T')[0];
                    document.getElementById('postScheduleTime').value = '12:00';
                    document.getElementById('postImage').src = post.image;
                    const editPostModal = new bootstrap.Modal(document.getElementById('editPostModal'));
                    editPostModal.show();

                    document.getElementById('savePostChanges').onclick = () => {
                        post.title = document.getElementById('postTitle').value;
                        post.content = document.getElementById('postContent').value;
                        post.hashtags = document.getElementById('postHashtags').value;
                        const newDate = document.getElementById('postScheduleDate').value;
                        if (newDate) {
                            const dateObj = new Date(newDate);
                            post.publishDate = dateObj.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                        }
                        postCard.querySelector('.card-title').textContent = post.title;
                        postCard.querySelector('.post-content').textContent = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');
                        let hashtagsElement = postCard.querySelector('.hashtags');
                        if (post.hashtags) {
                            if (hashtagsElement) {
                                hashtagsElement.textContent = post.hashtags;
                            } else {
                                const contentElement = postCard.querySelector('.post-content');
                                const hashtagsP = document.createElement('p');
                                hashtagsP.className = 'card-text text-muted hashtags';
                                hashtagsP.textContent = post.hashtags;
                                contentElement.after(hashtagsP);
                            }
                        } else if (hashtagsElement) {
                            hashtagsElement.remove();
                        }
                        postCard.querySelector('.publish-date').innerHTML = `<i class="ph ph-calendar me-1"></i> ${post.publishDate}`;
                        const editPostModal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
                        editPostModal.hide();
                        showAlert('Пост успешно обновлен', 'success');
                    };
                }
            });

            postCard.querySelector('.schedule-post-btn').addEventListener('click', () => {
                const postId = parseInt(postCard.dataset.postId);
                const post = window.generatedPosts.find(p => p.id === postId);
                if (post) {
                    const dateParts = post.publishDate.split('.');
                    const publishDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                    document.getElementById('scheduleDate').value = publishDate.toISOString().split('T')[0];
                    document.getElementById('scheduleTime').value = '12:00';
                    const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
                    scheduleModal.show();

                    document.getElementById('saveScheduleChanges').onclick = () => {
                        const newDate = document.getElementById('scheduleDate').value;
                        if (newDate) {
                            const dateObj = new Date(newDate);
                            post.publishDate = dateObj.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                            postCard.querySelector('.publish-date').innerHTML = `<i class="ph ph-calendar me-1"></i> ${post.publishDate}`;
                        }
                        const scheduleModal = bootstrap.Modal.getInstance(document.getElementById('scheduleModal'));
                        scheduleModal.hide();
                        showAlert('Пост успешно запланирован на ' + post.publishDate, 'success');
                    };
                }
            });
        });
    };

    const generateInstagramPost = (title, description) => `📱 ${title}\n\n${description}\n\nЧто вы думаете об этом? Поделитесь своим мнением в комментариях! 👇`;
    const generateFacebookPost = (title, description) => `${title}\n\n${description}\n\nА какой у вас опыт в этой сфере? Делитесь в комментариях!`;
    const generateLinkedInPost = (title, description) => `${title}\n\n${description}\n\nКакие еще тренды вы заметили в этой области? Буду рад обсудить в комментариях.`;
    const generateTwitterPost = (title, description) => {
        const maxLength = 280;
        let post = `${title}\n\n${description}`;
        if (post.length > maxLength) post = post.substring(0, maxLength - 3) + '...';
        return post;
    };

    const generateHashtags = (title, count = 5) => {
        const possibleHashtags = [
            '#маркетинг', '#smm', '#контентмаркетинг', '#бизнес', '#реклама',
            '#продвижение', '#digital', '#socialmedia', '#стратегия', '#брендинг',
            '#seo', '#аналитика', '#тренды', '#медиа', '#таргет'
        ];
        const hashtags = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * possibleHashtags.length);
            const hashtag = possibleHashtags[randomIndex];
            if (!hashtags.includes(hashtag)) hashtags.push(hashtag);
        }
        const titleWords = title.split(' ');
        if (titleWords.length > 0) {
            const titleHashtag = '#' + titleWords[0].toLowerCase().replace(/[^а-яa-z0-9]/gi, '');
            if (!hashtags.includes(titleHashtag)) hashtags.push(titleHashtag);
        }
        return hashtags.join(' ');
    };

    return { generatePosts, renderPosts, generateInstagramPost, generateFacebookPost, generateLinkedInPost, generateTwitterPost, generateHashtags };
};

export { setupPostsGeneration };