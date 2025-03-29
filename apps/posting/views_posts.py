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

def get_category_text(category_id):
    if category_id == 1:
        return translate("Опубликовано", lang).strip()
    elif category_id == 2:
        return translate("Черновик", lang).strip()
    elif category_id == 3:
        return translate("В очереди", lang).strip()
    else:
        return translate("Неизвестно", lang).strip()

def get_category_style(category_id):
    if category_id == 1:
        return "status-published".strip()
    elif category_id == 2:
        return "status-queued".strip()
    elif category_id == 3:
        return "status-draft".strip()
    else:
        return "status-draft".strip()

def get_platform_text(category_id):
    if category_id == 1:
        return "vk"
    elif category_id == 2:
        return "boosty"
    elif category_id == 3:
        return "telegram"
    else:
        return "email"

def get_platform_style(category_id):
    if category_id == 1:
        return "platform-vk".strip()
    elif category_id == 2:
        return "platform-email".strip()
    elif category_id == 3:
        return "platform-telegram".strip()
    else:
        return "platform-blog".strip()

# Эмулированные данные статей
posts_data = [
    {"publish_date": datetime(2023, 10, 1, 12, 30), "title": "Первая статья", "category_id": 1, "category_style": get_category_style(1), "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "description": "Статья о методах повышения конверсии веб-сайтов с практическими советами и рекомендациями для бизнеса любого размера. Узнайте, как улучшить показатели...", "content": "Полный текст первой статьи.", "author_id": 1, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 2, 15, 45), "title": "Вторая статья", "category_id": 2, "category_style": get_category_style(2), "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "description": "Обзор последних трендов использования ИИ в маркетинговых стратегиях. Как искусственный интеллект меняет подход к взаимодействию с клиентами...", "content": "Текст второй статьи.", "author_id": 2, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 3, 9, 15), "title": "Третья статья", "category_id": 3, "category_style": get_category_style(3), "category_text":get_category_text(3), "platform_style": get_platform_style(3), "platform_text": get_platform_text(3), "description": "Руководство по созданию эффективных email-кампаний для вашего бизнеса. Узнайте, как повысить открываемость писем и конверсию...", "content": "Подробности третьей статьи.", "author_id": 1, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 4, 14, 20), "title": "Четвертая статья", "category_id": 4, "category_style": get_category_style(4), "category_text":get_category_text(4), "platform_style": get_platform_style(4), "platform_text": get_platform_text(4), "description": "Подробное руководство по планированию контента для вашего блога. Узнайте, как составить эффективный контент-план и повысить вовлеченность аудитории...", "content": "Текст четвертой статьи.", "author_id": 2, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 5, 10, 10), "title": "Пятая статья", "category_id": 1, "category_style": get_category_style(1), "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "description": "Описание пятой статьи", "content": "Текст пятой статьи.", "author_id": 1, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Шестая статья", "category_id": 2, "category_style": get_category_style(2), "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "description": "Описание шестой статьи", "content": "Текст шестой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 4, 14, 20), "title": "Седьмая статья", "category_id": 2, "category_style": get_category_style(2), "category_text":get_category_text(2), "platform_style": get_platform_style(3), "platform_text": get_platform_text(3), "description": "Описание седьмой статьи", "content": "Текст седьмой статьи.", "author_id": 2, "image": "https://venyoo.ru/blog/wp-content/uploads/2017/04/10_Yml6ZXNwcm9jZXNz.jpg"},
    {"publish_date": datetime(2023, 10, 5, 10, 10), "title": "Восьмая статья", "category_id": 3, "category_style": get_category_style(3), "category_text":get_category_text(3), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "description": "Описание восьмой статьи", "content": "Текст восьмой статьи.", "author_id": 1, "image": "https://s0.rbk.ru/v6_top_pics/media/img/2/34/347186930962342.png"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Девятая статья", "category_id": 1, "category_style": get_category_style(1), "category_text":get_category_text(1), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "description": "Описание девятой статьи", "content": "Текст девятой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"},
    {"publish_date": datetime(2023, 10, 6, 16, 50), "title": "Десятая статья", "category_id": 3, "category_style": get_category_style(3), "category_text":get_category_text(3), "platform_style": get_platform_style(3), "platform_text": get_platform_text(3), "description": "Описание десятой статьи", "content": "Текст десятой статьи.", "author_id": 2, "image": "https://sberbs.ru/uploads/models/announcement/announcement_image/70/0._Image_by_Freepik.jpg"}
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
        "coins_used": "2.450",
        "coins_balance": "5.000",
        "title": translate("Мои посты", lang),
        "h2_text": translate("Мои посты", lang),
        "exit": translate("Выйти", lang),
        "by_date": translate("По дате", lang),
        "all_dates": translate("Все даты", lang),
        "today": translate("Сегодня", lang),
        "last_7_days": translate("Последние 7 дней", lang),
        "last_30_days": translate("Последние 30 дней", lang),
        "last_90_days": translate("Последние 90 дней", lang),
        "new_first": translate("Сначала новые", lang),
        "old_first": translate("Сначала старые", lang),
        "all_platforms": translate("Все платформы", lang),
        "vk": translate("Вконтакте", lang),
        "tg": translate("Телеграм", lang),
        "email": "Email",
        "boosty": translate("Бусти", lang),
        "all_statuses": translate("Все статусы", lang),
        "publish": translate("Опубликовано", lang),
        "draft": translate("Черновик", lang),
        "queue": translate("В очереди", lang),
        "create_post": translate("Создать пост", lang),
        "pub_queque": translate("Очередь публикаций", lang),
        "autogen": translate("Автогенерация постов", lang),
        "my_subscr": translate("Моя подписка", lang),
        "settings": translate("Настройки", lang),
        "coins": translate("Коины", lang),
        "used": translate("Использовано", lang),
        "purchase": translate("Купить коины", lang),
        "delete_button": translate("Удалить", lang),
        "publish_text": translate("Публикация", lang),
        "edit_button": translate("Редактировать", lang),
        "load_more_text": translate("Загрузить ещё", lang),
        "no_more_posts_text": translate("Больше постов нет", lang),
        "post_title": translate("Заголовок", lang),
        "post_descr": translate("Описание", lang),
        "platform": translate("Платформа", lang),
        "pub_date": translate("Дата публикации", lang),
        "image": translate("Изображение", lang),
        "status": translate("Статус", lang),
        "empty": translate("Оставьте пустым для немедленной публикации", lang),
        "cancel": translate("Отмена", lang),
        "save_changes": translate("Сохранить изменения", lang),
        "shure": translate("Вы уверены, что хотите удалить этот пост? Это действие нельзя будет отменить", lang),
        "del_confirm": translate("Подтверждение удаления", lang),
        "post_editing": translate("Редактирование поста", lang),
    })

def load_more_posts(request):
    """AJAX-обработчик для подгрузки следующих статей"""
    page = int(request.GET.get('page', 0))  # Номер страницы, начинаем с 0
    posts_per_page = 3
    start = page * posts_per_page  # Убираем смещение +3
    end = start + posts_per_page
    next_posts = posts_data[start:end]

    has_more = end < len(posts_data)

    posts_list = [{
        "publish_date": post["publish_date"].strftime("%d.%m.%Y %H:%M"),
        "title": post["title"],
        "category_style": post["category_style"],
        "category_text": post["category_text"],
        "platform_style": post["platform_style"],
        "platform_text": post["platform_text"],
        "description": post["description"],
        "content": post["content"],
        "author_id": post["author_id"],
        "image": post["image"]
    } for post in next_posts]

    return JsonResponse({
        "posts": posts_list,
        "has_more": has_more
    })
