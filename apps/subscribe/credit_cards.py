from django.views.decorators.http import require_POST
from project.language import translate, language
from django.shortcuts import redirect
from dotenv import load_dotenv
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG') == 'True'
in_detail = False

# Эмулированные данные платежей
card_data = [
    {"card_id": 1, "card_type": "Visa", "card_num": "5596 6687 2663 9415",
      "is_main": "True","valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
    {"card_id": 2, "card_type": "Visa", "card_num": "5596 6637 2552 8206",
      "is_main": "False", "valid_period": "06/26", "cardholder_name": "NIKITA DJIGURDA"},
    {"card_id": 3, "card_type": "Visa", "card_num": "2200 3902 9917 8912",
     "is_main": "False", "valid_period": "01/31", "cardholder_name": "NIKITA DJIGURDA"},
]

def delete_card(request, card_id):
    """Удаляет карту по card_id"""
    if request.method == 'POST':
        global card_data
        print(f"Попытка удалить карту с card_id: {card_id}")
        card_data[:] = [card for card in card_data if card['card_id'] != card_id]
        print(f"Карта удалена. Новый card_data: {card_data}")
        return redirect('subscription')
    else:
        return redirect('subscription')

@require_POST
def edit_payment_method(request):
    """
    Обработчик для редактирования способа оплаты.
    Проверяет валидность данных карты и обновляет их в card_data.
    """
    # Извлечение данных из POST-запроса
    lang = language(request)
    card_id = request.POST.get('cardId')
    card_number = request.POST.get('cardNumber')
    expiry_date = request.POST.get('expiryDate')
    cvv = request.POST.get('cvv')
    cardholder_name = request.POST.get('cardholderName')
    make_default = request.POST.get('makeDefaultCard') == 'on'

    # Проверка обязательных полей
    if not all([card_id, card_number, expiry_date, cvv, cardholder_name]):
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

    # Обновление данных карты
    global card_data
    for card in card_data:
        if str(card['card_id']) == card_id:
            card['card_num'] = card_number
            card['valid_period'] = expiry_date
            card['cardholder_name'] = cardholder_name
            if make_default:
                # Сбрасываем is_main для всех карт
                for c in card_data:
                    c['is_main'] = "False"
                card['is_main'] = "True"
            break
    else:
        return JsonResponse({
            'status': 'error',
            'message': translate("Карта не найдена", lang)
        }, status=404)

    # Вывод данных в консоль
    logger.info("Обновлены данные карты:")
    logger.info(f"ID карты: {card_id}")
    logger.info(f"Номер карты: {card_number}")
    logger.info(f"Срок действия: {expiry_date}")
    logger.info(f"CVV: {cvv}")
    logger.info(f"Имя держателя карты: {cardholder_name}")
    logger.info(f"Сделать основным способом оплаты: {make_default}")

    # Возвращаем успешный JSON-ответ
    return JsonResponse({
        'status': 'success',
        'message': translate("Карта успешно обновлена", lang)
    })
