from dotenv import load_dotenv
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG') == 'True'


# Эмулированные данные платежей
card_data = [
    # {"card_id": 1, "card_type": "Visa", "card_num": "2202 2545 3278 4582",
    #   "is_main": "True","valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
    # {"card_id": 1, "card_type": "Visa", "card_num": "2202 2545 3278 5556",
    #   "is_main": "False", "valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
    # {"card_id": 1, "card_type": "Visa", "card_num": "2202 2545 3278 5643",
    #  "is_main": "False", "valid_period": "03/33", "cardholder_name": "NIKITA DJIGURDA"},
]

def delete_card(request, card_id):
    """Удаляет карту по card_id"""
    global card_data  # Для модификации глобального списка (имитация)
    try:
        if debug:
            print(f"Попытка удалить карту с card_id: {card_id}")
        # Фильтруем card_data, оставляя только карты с другим card_id
        card_data[:] = [card for card in card_data if card['card_id'] != card_id]
        if debug:
            print(f"Карта удалена. Новый card_data: {card_data}")
        return redirect('subscription')  # Редирект на страницу подписки
    except Exception as e:
        if debug:
            print(f"Ошибка в delete_card: {str(e)}")
        raise