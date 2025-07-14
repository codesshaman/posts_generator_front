document.getElementById('savePostChanges').addEventListener('click', function () {
    const formData = new FormData();

    formData.append('title', document.getElementById('postTitle').value);
    formData.append('platform', document.getElementById('postPlatform').value);
    formData.append('content', document.getElementById('postContent').value);
    formData.append('hashtags', document.getElementById('postHashtags').value);
    formData.append('schedule_date', document.getElementById('postScheduleDate').value);
    formData.append('schedule_time', document.getElementById('postScheduleTime').value);

    const imageFile = document.getElementById('postImageUpload').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch('/save-post/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCSRFToken(),
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ответ от сервера:', data);
        alert('Данные успешно отправлены!');
    })
    .catch(error => {
        console.error('Ошибка при отправке формы:', error);
        alert('Произошла ошибка при отправке данных.');
    });
});

// CSRF-токен из cookie
function getCSRFToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.slice(name.length + 1));
        }
    }
    return '';
}
