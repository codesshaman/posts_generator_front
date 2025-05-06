document.addEventListener("DOMContentLoaded", function () {
    const saveBtn = document.getElementById('saveNotificationsBtn');
    const url = saveBtn.dataset.url;

    saveBtn.addEventListener('click', function () {
        const data = {
            email_new_post: document.getElementById('emailNewPostSwitch').checked,
            email_post_published: document.getElementById('emailPostPublishedSwitch').checked,
            email_tokens: document.getElementById('emailTokensSwitch').checked,
            email_billing: document.getElementById('emailBillingSwitch').checked,
            email_news: document.getElementById('emailNewsSwitch').checked,
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                alert("Настройки сохранены");
            } else {
                alert("Ошибка при сохранении");
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
            alert("Ошибка запроса");
        });
    });

    // CSRF helper
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
