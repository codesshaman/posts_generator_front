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
    {"card_id": 1, "card_type": "Visa", "card_num": "2202 2545 3278 4582",
      "is_main": "True","valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
    {"card_id": 2, "card_type": "Visa", "card_num": "2202 2545 3278 5556",
      "is_main": "False", "valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
    {"card_id": 3, "card_type": "Visa", "card_num": "2202 2545 3278 5643",
     "is_main": "False", "valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
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
