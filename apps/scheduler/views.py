from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
from .scheduling import get_posts
import os


# Загружаем .env файл
load_dotenv()

posts = get_posts()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def scheduler(request):
    """Отображает страницу расписания постов"""
    lang = language(request)
    if debug:
        print("Отображаем страницу расписания постов")
    return render(request, "posting/scheduler.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Очередь публикаций", lang),
        "h2_text": translate("Очередь публикаций", lang),
        "publish_text": translate("Публикация", lang),
        "publish_date": "20.05.2023",
        "publish_time": "09:00",
        "posts": posts
    })
