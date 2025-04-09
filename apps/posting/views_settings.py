from project.language import translate
from django.shortcuts import render
from dotenv import load_dotenv
from datetime import datetime
import os

# Устанавливаем язык
lang = "en"

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

# Create your views here.
def settings(request):
    """Отображает страницу настроек"""
    if debug:
        print("Отображаем страницу настроек")
    return render(request, "posting/settings.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Настройки", lang),
        "h2_text": translate("Настройки", lang),
        "publish_text": translate("Публикация: ", lang),
        "read_button": translate("Читать статью", lang),
        "load_more_text": translate("Загрузить ещё", lang),
        "no_more_posts_text": translate("Больше постов нет", lang),
    })