from django.http import JsonResponse
from django.views.decorators.http import require_POST
import logging

# Настройка логирования для вывода в консоль
logger = logging.getLogger(__name__)

@require_POST
def add_payment_method(request):
    """
    Обработчик для добавления способа оплаты.
    Выводит данные формы в консоль и возвращает JSON-ответ.
    """
    # Извлечение данных из POST-запроса
    card_number = request.POST.get('cardNumber')
    expiry_date = request.POST.get('expiryDate')
    cvv = request.POST.get('cvv')
    cardholder_name = request.POST.get('cardholderName')
    make_default = request.POST.get('makeDefaultCard') == 'on'

    # Вывод данных в консоль
    logger.info("Получены данные формы добавления способа оплаты:")
    logger.info(f"Номер карты: {card_number}")
    logger.info(f"Срок действия: {expiry_date}")
    logger.info(f"CVV: {cvv}")
    logger.info(f"Имя держателя карты: {cardholder_name}")
    logger.info(f"Сделать основным способом оплаты: {make_default}")

    # Возвращаем успешный JSON-ответ
    return JsonResponse({
        'status': 'success',
        'message': 'Способ оплаты успешно обработан (заглушка).'
    })
