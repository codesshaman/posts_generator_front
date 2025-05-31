document.getElementById('addCoinsForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const coinAmount = document.getElementById('coinAmount').value;
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Вывод в консоль (заглушка)
//    console.log('Количество коинов:', coinAmount);

    try {
        const response = await fetch('/add-coins/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({
                coins: parseInt(coinAmount)
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Закрываем модалку
            const modal = bootstrap.Modal.getInstance(document.getElementById('addCoinsModal'));
            modal.hide();
            // Перезагружаем страницу
            window.location.reload();
        } else {
            console.error(window.Translations.error, data);
        }
    } catch (error) {
        console.error(window.Translations.error_sending_form, error);
    }
});
