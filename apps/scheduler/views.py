from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from datetime import datetime, timedelta
from django.shortcuts import render
from .scheduling import get_posts
from dotenv import load_dotenv
import os


# Загружаем .env файл
load_dotenv()

posts = get_posts()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')


def filter_posts_by_date(posts, min_date, max_date):
    """
    Фильтрует список постов по диапазону дат между min_date и max_date (включительно).

    Args:
        posts (list): Список словарей с данными постов, где каждый словарь содержит поле 'publish_date'.
        min_date (str): Минимальная дата в формате 'YYYY-MM-DD'.
        max_date (str): Максимальная дата в формате 'YYYY-MM-DD'.

    Returns:
        list: Отфильтрованный список постов, где publish_date находится в диапазоне [min_date, max_date].
    """
    # Преобразуем входные даты в объекты datetime
    min_date = datetime.strptime(min_date, '%Y-%m-%d')
    max_date = datetime.strptime(max_date, '%Y-%m-%d')

    # Фильтруем посты по диапазону дат
    filtered_posts = [
        post for post in posts
        if min_date <= datetime.strptime(post['publish_date'], '%Y-%m-%d') <= max_date
    ]

    return filtered_posts


def get_date(days):
    current_date = datetime.now()
    date = (current_date + timedelta(days=days)).strftime('%Y-%m-%d')
    return date

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def scheduler(request):
    """Отображает страницу расписания постов"""
    lang = language(request)
    if debug:
        print("Отображаем страницу расписания постов")
    this_week = filter_posts_by_date(posts, get_date(0), get_date(7))
    next_week = filter_posts_by_date(posts, get_date(7), get_date(14))
    next_month = filter_posts_by_date(posts, get_date(14), get_date(30))
    return render(request, "posting/scheduler.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Очередь публикаций", lang),
        "h2_text": translate("Очередь публикаций", lang),
        "publish_text": translate("Публикация", lang),
        "publish_date": "20.05.2023",
        "publish_time": "09:00",
        "posts": this_week,
        "posts2": next_week,
        "posts3": next_month,
    })
