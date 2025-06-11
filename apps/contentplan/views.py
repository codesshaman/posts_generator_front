from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def content_plan(request):
    """Отображает страницу постов"""
    lang = language(request)
    if debug:
        print("Отображаем страницу контент-плана")
    return render(request, "posting/content_plan.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Автогенерация постов", lang),
        "h2_text": translate("Автогенерация постов", lang),
    })
