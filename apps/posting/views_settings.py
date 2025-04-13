from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
from datetime import datetime
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def settings(request):
    """Отображает страницу настроек"""
    if debug:
        print("Отображаем страницу настроек")
    lang = language(request)
    return render(request, "posting/settings.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Настройки", lang),
        "h2_text": translate("Настройки", lang),
    })