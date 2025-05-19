from django.http import JsonResponse
from project.language import translate, language
from django.views.decorators.http import require_POST
import logging
import re
from datetime import datetime

# Настройка логирования для вывода в консоль
logger = logging.getLogger(__name__)

@require_POST
def add_payment_method(request):
    """
    Обработчик для добавления способа оплаты.
    Проверяет валидность данных карты и выводит их в консоль.
    """
    # Извлечение данных из POST-запроса
    lang = language(request)
    card_number = request.POST.get('cardNumber')
    expiry_date = request.POST.get('expiryDate')
    cvv = request.POST.get('cvv')
    cardholder_name = request.POST.get('cardholderName')
    make_default = request.POST.get('makeDefaultCard') == 'on'

    # Проверка обязательных полей
    if not all([card_number, expiry_date, cvv, cardholder_name]):
        return JsonResponse({
            'status': 'error',
            'message': translate("Все поля обязательны для заполнения.", lang)
        }, status=400)

    # Проверка номера карты (алгоритм Луна)
    def is_valid_card_number(card_number):
        clean_number = re.sub(r'\D', '', card_number)
        if not re.match(r'^\d{13,19}$', clean_number):
            return False
        sum = 0
        is_even = False
        for i in range(len(clean_number) - 1, -1, -1):
            digit = int(clean_number[i])
            if is_even:
                digit *= 2
                if digit > 9:
                    digit -= 9
            sum += digit
            is_even = not is_even
        return sum % 10 == 0

    if not is_valid_card_number(card_number):
        return JsonResponse({
            'status': 'error',
            'message': translate("Недействительный номер карты", lang)
        }, status=400)

    # Проверка срока действия
    def is_valid_expiry_date(expiry):
        match = re.match(r'^(\d{2})\/(\d{2})$', expiry)
        if not match:
            return False
        month, year = map(int, match.groups())
        year += 2000
        now = datetime.now()
        return 1 <= month <= 12 and year >= now.year and \
               (year > now.year or (year == now.year and month >= now.month))

    if not is_valid_expiry_date(expiry_date):
        return JsonResponse({
            'status': 'error',
            'message': translate("Недействительный или истёкший срок действия.", lang)
        }, status=400)

    # Проверка CVV
    def is_valid_cvv(cvv, card_number):
        clean_number = re.sub(r'\D', '', card_number)
        is_amex = re.match(r'^3[47]', clean_number)
        cvv_pattern = r'^\d{4}$' if is_amex else r'^\d{3}$'
        return bool(re.match(cvv_pattern, cvv))

    if not is_valid_cvv(cvv, card_number):
        return JsonResponse({
            'status': 'error',
            'message': translate("Недействительный CVV", lang)
        }, status=400)

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
        'message': translate("Карта успешно добавлена", lang)
    })
