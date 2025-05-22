document.getElementById('addCoinsForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const coinAmount = document.getElementById('coinAmount').value;
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Вывод в консоль (заглушка) с использованием перевода
    console.log(`${window.translations?.coin_amount || 'Number of coins'}:`, coinAmount);

    try {
        const response = await fetch(window.urls.add_coins, {
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
            // Успешная обработка
            console.log(`${window.translations?.succpay || 'Success'}:`, data);
            // Закрываем модалку
            const modal = bootstrap.Modal.getInstance(document.getElementById('addCoinsModal'));
            modal.hide();
            // Перезагружаем страницу
            window.location.reload();
        } else {
            console.error(`${window.translations?.error || 'Error'}:`, data);
        }
    } catch (error) {
        console.error(`${window.translations?.error_sending_form || 'Error sending request'}:`, error);
    }
});
