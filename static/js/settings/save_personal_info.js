document.addEventListener('DOMContentLoaded', function () {
    const personalInfoForm = document.getElementById('PersonalInfo');

    if (personalInfoForm) {
        personalInfoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(personalInfoForm);

            fetch('/settings/personal-info/update/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert(data.message);  // Можно заменить на кастомный alert
                } else {
                    alert(window.Translations.error_message ' + data.message);
                }
            })
            .catch(error => {
                console.error(window.Translations.error_message, error);
                alert(window.Translations.error_data_sending);
            });
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
