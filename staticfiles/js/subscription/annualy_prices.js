document.addEventListener("DOMContentLoaded", function () {
    const switchInput = document.getElementById("billingPeriodSwitch");
    const prices = document.querySelectorAll(".price");
    const periodsMonthly = document.querySelectorAll(".billing-period-text-monthly");
    const periodsYearly = document.querySelectorAll(".billing-period-text-yearly");
    const periodElements = document.querySelectorAll(".period");

    // Текст для периода (месяц/год)
    const monthText = window.translations.month;
    const yearText = window.translations.year;

    switchInput.addEventListener("change", function () {
        const useAnnual = switchInput.checked;

        prices.forEach(function (priceElement, index) {
            const monthly = priceElement.dataset.monthly;
            const annually = priceElement.dataset.annually;
            priceElement.textContent = useAnnual ? annually : monthly;

            // Обновляем период (месяц/год)
            periodElements[index].textContent = useAnnual ? "/" + yearText : "/" + monthText;
        });

        // Переключаем видимость текстов
        periodsMonthly.forEach(el => el.style.display = useAnnual ? "none" : "block");
        periodsYearly.forEach(el => el.style.display = useAnnual ? "block" : "none");
    });
});