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
def create_post(request):
    lang = language(request)
    """Отображает страницу создания постов"""
    if debug:
        print("Отображаем страницу создания постов")
    return render(request, "posting/create_post.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Создать пост", lang),
        "h2_text": translate("Создать пост", lang),
        "publish_text": translate("Публикация: ", lang),
        "read_button": translate("Читать статью", lang),
        "load_more_text": translate("Загрузить ещё", lang),
        "no_more_posts_text": translate("Больше постов нет", lang),
        "max_coins": "5,000",
    })