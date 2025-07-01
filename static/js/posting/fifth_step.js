document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            if (sidebar.classList.contains('show')) {
                overlay.style.display = 'block';
            } else {
                overlay.style.display = 'none';
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            overlay.style.display = 'none';
        });
    }
});

document.getElementById('generatePostsBtn').addEventListener('click', function () {
    const items = [];

    document.querySelectorAll('.content-plan-item').forEach((planItem, index) => {
        const id = parseInt(planItem.dataset.itemId);
        const title = planItem.querySelector('.plan-item-title').value.trim();
        const description = planItem.querySelector('.plan-item-description').value.trim();
        const platform = planItem.querySelector('.platform-select').value;
        const publishDate = planItem.querySelector('.publish-date').value;
        const generateImages = planItem.querySelector('#autoGenerateImages').checked;

        items.push({
            id,
            position: index + 1,  // <-- НОВОЕ: позиция (1-based)
            title,
            description,
            platform,
            publishDate,
            generateImages
        });
    });

    // Отправка данных на сервер Django
    fetch('/generate-posts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({ items })
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Ошибка при отправке:', error);
    });
});