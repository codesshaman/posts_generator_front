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

def get_category_style(category_id):
    if category_id == 1:
        return "platform-instagram".strip()
    elif category_id == 2:
        return "platform-facebook".strip()
    elif category_id == 3:
        return "platform-linkedin".strip()
    elif category_id == 4:
        return "platform-twitter".strip()
    else:
        return "platform-vk".strip()

# Эмулированные данные статей
articles_data = [
    {"publish_date": datetime(2023, 10, 1, 12, 30), "title": "Первая статья", "category_id": 1, "category_style": get_category_style(1), "description": "Краткое описание первой статьи", "content": "Полный текст первой статьи.", "author_id": 1, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 2, 15, 45), "title": "Вторая статья", "category_id": 2, "category_style": get_category_style(2), "description": "Краткое описание второй статьи", "content": "Текст второй статьи.", "author_id": 2, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 3, 9, 15), "title": "Третья статья", "category_id": 3, "category_style": get_category_style(3), "description": "Краткое описание третьей статьи", "content": "Подробности третьей статьи.", "author_id": 1, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 4, 14, 20), "title": "Четвертая статья", "category_id": 4, "category_style": get_category_style(4), "description": "Описание четвертой статьи", "content": "Текст четвертой статьи.", "author_id": 2, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 5, 10, 10), "title": "Пятая статья", "category_id": 1, "category_style": get_category_style(1), "description": "Описание пятой статьи", "content": "Текст пятой статьи.", "author_id": 1, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Шестая статья", "category_id": 2, "category_style": get_category_style(2), "description": "Описание шестой статьи", "content": "Текст шестой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 4, 14, 20), "title": "Седьмая статья", "category_id": 3, "category_style": get_category_style(3), "description": "Описание седьмой статьи", "content": "Текст седьмой статьи.", "author_id": 2, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 5, 10, 10), "title": "Восьмая статья", "category_id": 4, "category_style": get_category_style(4), "description": "Описание восьмой статьи", "content": "Текст восьмой статьи.", "author_id": 1, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Девятая статья", "category_id": 2, "category_style": get_category_style(4), "description": "Описание девятой статьи", "content": "Текст девятой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Десятая статья", "category_id": 2, "category_style": get_category_style(3), "description": "Описание десятой статьи", "content": "Текст десятой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"}
]
article = articles_data[2]

host = os.getenv('PUBLIC_HOST')

def articles(request):
    """Отображает страницу статей"""
    if debug:
        print("Отображаем страницу статей")
    initial_articles = articles_data[:3]  # Первые 3 статьи (индексы 0-2)
    has_more = len(articles_data) > 3
    return render(request, "articles/articles_list.html", {
        "articles": initial_articles,
        "has_more": has_more,
        "title": translate("Статьи", lang),
        "h2_text": translate("Статьи", lang),
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
    next_articles = articles_data[start:end]

    has_more = end < len(articles_data)

    articles_list = [{
        "publish_date": article["publish_date"].strftime("%d.%m.%Y %H:%M"),
        "title": article["title"],
        "category_style": article["category_style"],
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
