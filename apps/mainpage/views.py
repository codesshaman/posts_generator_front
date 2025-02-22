from django.shortcuts import render
from dotenv import load_dotenv # Для дебага
import requests  # Для работы с внешними API
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')


def index(request):
    """Отображает главную страницу"""
    print("Отображаем главную страницу")
    return render(request, "index.html", {"title": "Welcome to Frontend"})