document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-list');
    const editModalElement = document.getElementById('editPostModal');

    if (!postsContainer) {
        console.error('Контейнер #posts-list не найден');
        return;
    }
    if (!editModalElement) {
        console.error('Модальное окно не найдено');
        return;
    }

    let editModal;
    try {
        editModal = new bootstrap.Modal(editModalElement);
    } catch (error) {
        console.error('Ошибка при инициализации модального окна:', error);
        return;
    }

    function autoResizeTextarea(textarea) {
        if (!textarea) return;
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        textarea.style.height = 'auto';
        const minHeight = 60;
        const maxHeight = 300;
        const newHeight = Math.min(maxHeight, Math.max(minHeight, textarea.scrollHeight));
        textarea.style.height = newHeight + 'px';
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
        window.scrollTo(0, scrollPos);
    }

    const descriptionTextarea = document.getElementById('editPostDescription');
    if (descriptionTextarea) {
        descriptionTextarea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
    }

    const dateInput = document.getElementById('editPostPublishDate');
    if (dateInput) {
        dateInput.setAttribute('type', 'datetime-local');
        dateInput.addEventListener('click', function() {
            this.focus();
            if (this.showPicker) this.showPicker();
        });
        const dateInputContainer = dateInput.parentElement;
        if (dateInputContainer) {
            const calendarIcon = document.createElement('span');
            calendarIcon.className = 'calendar-icon ph ph-calendar position-absolute';
            calendarIcon.style.right = '10px';
            calendarIcon.style.top = '50%';
            calendarIcon.style.transform = 'translateY(-50%)';
            calendarIcon.style.pointerEvents = 'none';
            calendarIcon.style.zIndex = '10';
            dateInputContainer.style.position = 'relative';
            dateInput.insertAdjacentElement('afterend', calendarIcon);
        }
    }

    postsContainer.addEventListener('click', function(event) {
        const button = event.target.closest('.btn-edit');
        if (!button) return;

        event.preventDefault();

        const postCard = button.closest('.post-card');
        if (!postCard) {
            console.error('Не удалось найти родительскую карточку поста');
            return;
        }

        const titleElement = postCard.querySelector('.card-title');
        const descriptionElement = postCard.querySelector('.post-description');
        const imageElement = postCard.querySelector('.post-image');
        if (!titleElement || !descriptionElement || !imageElement) {
            console.error('Не удалось найти необходимые элементы поста');
            return;
        }

        const postTitle = titleElement.textContent;
        const postDescription = descriptionElement.textContent;
        const postImage = imageElement.src;

        let platform = 'vk';
        const platformBadge = postCard.querySelector('.platform-badge');
        if (platformBadge) {
            if (platformBadge.classList.contains('platform-vk')) platform = 'vk';
            if (platformBadge.classList.contains('platform-telegram')) platform = 'telegram';
            if (platformBadge.classList.contains('platform-email')) platform = 'email';
            if (platformBadge.classList.contains('platform-blog')) platform = 'blog';
        }

        let status = 'published';
        const statusBadge = postCard.querySelector('.post-status');
        if (statusBadge) {
            if (statusBadge.classList.contains('status-draft')) status = 'draft';
            if (statusBadge.classList.contains('status-queued')) status = 'queued';
        }

        const postTimeElement = postCard.querySelector('.post-time');
        let publishDate = '';
        if (postTimeElement) {
            const timeText = postTimeElement.textContent;
            const dateMatch = timeText.match(/(\d{2})\.(\d{2})\.(\d{4})\s*(\d{2}):(\d{2})/);
            if (dateMatch) {
                publishDate = `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}T${dateMatch[4]}:${dateMatch[5]}`;
            }
        }

        const postId = button.dataset.postId || '0';

        const idInput = document.getElementById('editPostId');
        const titleInput = document.getElementById('editPostTitle');
        const descriptionInput = document.getElementById('editPostDescription');
        const platformInput = document.getElementById('editPostPlatform');
        const statusInput = document.getElementById('editPostStatus');
        const publishDateInput = document.getElementById('editPostPublishDate');
        const currentImage = document.getElementById('currentPostImage');

        if (idInput) idInput.value = postId;
        if (titleInput) titleInput.value = postTitle;
        if (descriptionInput) {
            descriptionInput.value = postDescription;
            setTimeout(() => autoResizeTextarea(descriptionInput), 0);
        }
        if (platformInput) platformInput.value = platform;
        if (statusInput) statusInput.value = status;
        if (publishDateInput) publishDateInput.value = publishDate;
        if (currentImage) {
            currentImage.src = postImage;
            currentImage.style.display = 'block';
        }

        editModal.show();
    });

    const saveButton = document.getElementById('saveChangesBtn'); // Убедитесь, что ID совпадает
    if (!saveButton) {
        console.error('Кнопка сохранения не найдена');
        return;
    }

    saveButton.addEventListener('click', function() {
        const postIdInput = document.getElementById('editPostId');
        const titleInput = document.getElementById('editPostTitle');
        const descriptionInput = document.getElementById('editPostDescription');
        const platformInput = document.getElementById('editPostPlatform');
        const statusInput = document.getElementById('editPostStatus');
        const publishDateInput = document.getElementById('editPostPublishDate');
        const imageInput = document.getElementById('editPostImage');
        const currentImageElement = document.getElementById('currentPostImage');

        if (!postIdInput || !titleInput || !descriptionInput || !platformInput || !statusInput) {
            console.error('Не удалось найти необходимые поля формы');
            return;
        }

        const postId = postIdInput.value;
        const title = titleInput.value;
        const description = descriptionInput.value;
        const platform = platformInput.value;
        const status = statusInput.value;
        const publishDate = publishDateInput ? publishDateInput.value : '';
        const imageFile = imageInput && imageInput.files.length > 0 ? imageInput.files[0] : null;
        const currentImage = currentImageElement ? currentImageElement.src : '';

        if (!title || !description) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // Формируем данные для отправки
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('platform', platform);
        formData.append('status', status);
        if (publishDate) formData.append('publish_date', publishDate);
        if (imageFile) formData.append('image', imageFile);

        // Отправляем AJAX-запрос
        fetch(`/edit-post/${postId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                updatePostInDOM(postId, {
                    title: data.post.title,
                    description: data.post.description,
                    platform: data.post.platform,
                    status: data.post.status,
                    publishDate: data.post.publish_date,
                    image: data.post.image
                });
                editModal.hide();
            } else {
                throw new Error(data.message || 'Неизвестная ошибка');
            }
        })
        .catch(error => {
            console.error('Ошибка при редактировании:', error);
            alert('Не удалось сохранить изменения: ' + error.message);
        });
    });

    function updatePostInDOM(postId, postData) {
        const postCards = document.querySelectorAll('.post-card');
        let targetPost = null;

        for (let card of postCards) {
            const editButton = card.querySelector('.btn-edit');
            if (editButton && editButton.dataset.postId === postId) {
                targetPost = card;
                break;
            }
        }

        if (!targetPost) {
            console.warn('Пост с ID ' + postId + ' не найден');
            return;
        }

        const titleElement = targetPost.querySelector('.card-title');
        const descriptionElement = targetPost.querySelector('.post-description');
        const imageElement = targetPost.querySelector('.post-image');
        if (titleElement) titleElement.textContent = postData.title;
        if (descriptionElement) descriptionElement.textContent = postData.description;
        if (postData.image && imageElement) imageElement.src = postData.image;

        const platformBadge = targetPost.querySelector('.platform-badge');
        if (platformBadge) {
            platformBadge.className = 'platform-badge';
            platformBadge.classList.add('platform-' + postData.platform);
            let platformText = 'vk';
            if (postData.platform === 'telegram') platformText = 'telegram';
            if (postData.platform === 'email') platformText = 'email';
            if (postData.platform === 'blog') platformText = 'blog';
            platformBadge.textContent = platformText;
        }

        const statusBadge = targetPost.querySelector('.post-status');
        if (statusBadge) {
            statusBadge.className = 'post-status';
            statusBadge.classList.add('status-' + postData.status);
            let statusText = 'Опубликовано';
            if (postData.status === 'draft') statusText = 'Черновик';
            if (postData.status === 'queued') statusText = 'В очереди';
            statusBadge.textContent = statusText;
        }

        const postTimeElement = targetPost.querySelector('.post-time');
        if (postTimeElement && postData.publishDate) {
            const date = new Date(postData.publishDate);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
            postTimeElement.innerHTML = `<i class="ph ph-clock me-1"></i> ${postData.status === 'queued' ? 'Публикация:' : ''} ${formattedDate}`;
        }
    }

    editModalElement.addEventListener('shown.bs.modal', function() {
        const descriptionTextarea = document.getElementById('editPostDescription');
        if (descriptionTextarea) autoResizeTextarea(descriptionTextarea);
        const titleInput = document.getElementById('editPostTitle');
        if (titleInput) titleInput.focus();
    });
});
