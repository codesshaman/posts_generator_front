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

def index(request):
    """Отображает главную страницу"""
    if debug:
        print("Отображаем главную страницу")
    auth_url = "https://" + host + "/authentications/"
    return render(request, "index.html", {
            "title": "Добро пожаловать",
            "h2_text": "Главная страница",
            "auth_text": "Войдите для продолжения!",
            "auth_button_text": "Аутентификация",
            'auth_url': auth_url
        })
