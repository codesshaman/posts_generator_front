from django.shortcuts import render
from dotenv import load_dotenv # Для дебага
import requests  # Для работы с внешними API
import os

# Загружаем .env файл
load_dotenv()


# Устанавливаем debug mode
debug = os.getenv('DEBUG')

# Получаем данные приложения VK
client_id = os.getenv('VK_CLIENT_ID')
redirect_uri = os.getenv('VK_REDIRECT_URI')

def index(request):
    """Отображает главную страницу"""
    if debug:
        print("Отображаем главную страницу")
    vk_auth_url = (
        "https://oauth.vk.com/authorize?"
        "client_id={client_id}&"
        "display=page&"
        "redirect_uri={redirect_uri}&"
        "scope=email&"
        "response_type=token&"
        "v=5.131"
    ).format(
        client_id=client_id,
        redirect_uri=redirect_uri,
    )
    return render(request, "index.html", {
            "title": "Добро пожаловать!",
            "h2_text": "Авторизация!",
            "vk_auth_text": "Войдите через VK для продолжения!",
            'vk_auth_url': vk_auth_url
        })
