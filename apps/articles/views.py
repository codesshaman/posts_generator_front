from django.shortcuts import render
from dotenv import load_dotenv # Для дебага
import requests  # Для работы с внешними API
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

# Получаем данные приложения VK
host = os.getenv('PUBLIC_HOST')

def articles(request):
    """Отображает главную страницу"""
    if debug:
        print("Отображаем страницу статей")
    return render(request, "articles/articles_list.html", {
            "title": "Статьи",
            "h2_text": "Статьи",
        })
