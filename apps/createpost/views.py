from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from django.http import JsonResponse
from django.shortcuts import render
from dotenv import load_dotenv
import os


# Загружаем .env файл
load_dotenv()

def get_category_text(category_id):
    if category_id == 1:
        return translate("Активна", language).strip()
    else:
        return translate("Требует подтверждения", language).strip()


def get_platform_style(category_id):
    if category_id == 1:
        return "bg-warning".strip()
    else:
        return "bg-success".strip()

def get_platform_text(category_id):
    if category_id == 1:
        return "Facebook"
    elif category_id == 2:
        return "linkedin"
    elif category_id == 3:
        return "Instagram"
    else:
        return "Twitter"

# Эмулированные данные групп
groups_data = [
    {"id": 1, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 2, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(3), "title": "Маркетинг завтра", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 4, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Маркетинг послезавтра", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 5, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг будущего", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 6, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(3), "platform_text": get_platform_text(3), "title": "Бизнес дома", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 7, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Бизнес в гараже", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 8, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Бизнес на даче", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 9, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(3), "platform_text": get_platform_text(3), "title": "Каннибализм и цветоводство в эпоху постапокалиптического постмодернизма", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 10, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 11, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(3), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 12, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(3), "platform_text": get_platform_text(3), "title": "Мемы про котиков", "subscribers": "8", "group_id": "@cannibal_flowers"},
]

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def create_post(request):
    lang = language(request)
    seen = set()
    unique_platforms = []
    for group in groups_data:
        key = group['platform_text']
        if key not in seen:
            seen.add(key)
            unique_platforms.append({
                "text": group["platform_text"],
                "style": group["platform_style"],  # например: "facebook"
                "icon": group["platform_style"] + "-logo"  # если вы используете Phosphor Icons
            })
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
        'groups_data': groups_data,
        'card_title': 'Выберите группу',
        'muted_text': 'Пожалуйста, выберите одну из доступных групп.',
        'platform': 'Выберите платформу',
        'unique_platforms': unique_platforms,
    })

def generate_unique_id(request):
    unique_id = "2353534_23423423"
    return JsonResponse({'id': unique_id})