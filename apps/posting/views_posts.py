from project.language import translate
from django.http import JsonResponse
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

# Эмулированные данные статей
posts_data = [
    {"publish_date": datetime(2023, 10, 1, 12, 30), "title": "Первая статья", "category_id": 1, "description": "Статья о методах повышения конверсии веб-сайтов с практическими советами и рекомендациями для бизнеса любого размера. Узнайте, как улучшить показатели...", "content": "Полный текст первой статьи.", "author_id": 1, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 2, 15, 45), "title": "Вторая статья", "category_id": 2, "description": "Обзор последних трендов использования ИИ в маркетинговых стратегиях. Как искусственный интеллект меняет подход к взаимодействию с клиентами...", "content": "Текст второй статьи.", "author_id": 2, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 3, 9, 15), "title": "Третья статья", "category_id": 1, "description": "Руководство по созданию эффективных email-кампаний для вашего бизнеса. Узнайте, как повысить открываемость писем и конверсию...", "content": "Подробности третьей статьи.", "author_id": 1, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 4, 14, 20), "title": "Четвертая статья", "category_id": 2, "description": "Подробное руководство по планированию контента для вашего блога. Узнайте, как составить эффективный контент-план и повысить вовлеченность аудитории...", "content": "Текст четвертой статьи.", "author_id": 2, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 5, 10, 10), "title": "Пятая статья", "category_id": 1, "description": "Описание пятой статьи", "content": "Текст пятой статьи.", "author_id": 1, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Шестая статья", "category_id": 2, "description": "Описание шестой статьи", "content": "Текст шестой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 4, 14, 20), "title": "Седьмая статья", "category_id": 2, "description": "Описание седьмой статьи", "content": "Текст седьмой статьи.", "author_id": 2, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 5, 10, 10), "title": "Восьмая статья", "category_id": 1, "description": "Описание восьмой статьи", "content": "Текст восьмой статьи.", "author_id": 1, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Девятая статья", "category_id": 2, "description": "Описание девятой статьи", "content": "Текст девятой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Десятая статья", "category_id": 2, "description": "Описание десятой статьи", "content": "Текст десятой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"}
]

host = os.getenv('PUBLIC_HOST')

# Create your views here.
def posts(request):
    """Отображает страницу постов"""
    if debug:
        print("Отображаем страницу постов")
    initial_posts = posts_data[:3]  # Первые 3 статьи (индексы 0-2)
    has_more = len(posts_data) > 3
    return render(request, "posting/posts_list.html", {
        "posts": initial_posts,
        "has_more": has_more,
        "title": translate("Мои посты", lang),
        "h2_text": translate("Мои посты", lang),
        "publish_text": translate("Публикация: ", lang),
        "read_button": translate("Читать статью", lang),
        "load_more_text": translate("Загрузить ещё", lang),
        "no_more_posts_text": translate("Больше постов нет", lang),
    })

def load_more_articles(request):
    """AJAX-обработчик для подгрузки следующих статей"""
    page = int(request.GET.get('page', 0))  # Номер страницы, начинаем с 0
    articles_per_page = 3
    start = page * articles_per_page  # Убираем смещение +3
    end = start + articles_per_page
    next_articles = posts_data[start:end]

    has_more = end < len(posts_data)

    articles_list = [{
        "publish_date": article["publish_date"].strftime("%d.%m.%Y %H:%M"),
        "title": article["title"],
        "category_id": article["category_id"],
        "description": article["description"],
        "content": article["content"],
        "author_id": article["author_id"],
        "image": article["image"]
    } for article in next_articles]

    return JsonResponse({
        "articles": articles_list,
        "has_more": has_more
    })
