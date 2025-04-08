from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
from datetime import datetime
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

# Create your views here.
def subscription(request):
    lang = language(request)
    """Отображает страницу подписки"""
    if debug:
        print("Отображаем страницу подписки")
    return render(request, "posting/subscription.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Моя подписка", lang),
        "h2_text": translate("Моя подписка", lang),
        "active_status": translate("Активна: ", lang),
        "tokens_prof": "5,000",
        "start_date_text": "15.03.2023",
        "next_payment_text": "15.04.2023",
        "price_sum": "2,990",
        "сurrency": "₽",
        "last_card_nums": "4582",
        "сurrent_expenses": "2,550",
        "coins_available": "5,000",
    })