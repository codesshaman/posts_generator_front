from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from project.language import translate, language


#########################################
############ Заглушки ###################
#########################################

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
        return "vk"
    elif category_id == 2:
        return "boosty"
    elif category_id == 3:
        return "telegram"
    else:
        return "email"

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

# Эмулированные темы групп с уникальными ID и описанием
groups_topics = [
    {"id": 1, "title": "SEO", "percent": "28", "description": "Search engine optimization strategies."},
    {"id": 2, "title": "SMM", "percent": "21", "description": "Social media marketing trends."},
    {"id": 3, "title": "Sales", "percent": "17", "description": "Effective sales techniques."},
    {"id": 4, "title": "Content", "percent": "14", "description": "Content creation and management."},
    {"id": 5, "title": "Marketing", "percent": "9", "description": "General marketing practices."},
    {"id": 6, "title": "Advertising", "percent": "6", "description": "Paid advertising campaigns."},
    {"id": 7, "title": "Parapsychology", "percent": "5", "description": "Unconventional topic."},
]
