from project.language import translate, language
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.urls import reverse
from dotenv import load_dotenv
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')


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
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
]

#############################################
############# Конец заглушкам ###############
#############################################


def groups(request):
    """Отображает страницу настроек"""
    if debug:
        print("Отображаем страницу настроек")


    # Получение данных о языке, часовом поясе и темной теме
    lang = language(request)
    selected_language = request.COOKIES.get('user_language', 'en')
    selected_timezone = request.COOKIES.get('user_timezone', 'Europe/Moscow')
    selected_darkmode = request.COOKIES.get('dark_mode', 'false')

    # Предполагается, что groups_data — это список или QuerySet
    # Если это не глобальная переменная, замените на ваш источник данных, например:
    # groups_data = YourModel.objects.all()
    paginator = Paginator(groups_data, 10)  # 10 групп на страницу

    # Получаем номер страницы из GET-параметра
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "groups/groups.html", {
        "title": translate("Группы", lang),
        "h2_text": translate("Группы", lang),
        "selected_language": selected_language,
        "selected_timezone": selected_timezone,
        "selected_darkmode": selected_darkmode,
        "groups_data": page_obj,  # Передаем объект страницы вместо всего списка
        "page_obj": page_obj,  # Для пагинации в шаблоне
    })

def edit_group(request, group_id):
    if request.method == 'POST':
        for group in groups_data:
            if group['id'] == group_id:
                group['title'] = request.POST['title']
                group['group_id'] = request.POST['group_id']
                group['subscribers'] = request.POST['subscribers']
                group['platform_text'] = request.POST['platform']
                group['category_id'] = int(request.POST['category'])
                group['category_text'] = get_category_text(group['category_id'])
                group['platform_style'] = get_platform_style(group['category_id'])
                break
    return redirect(reverse('index'))

def delete_group(request, group_id):
    global groups_data
    if request.method == 'POST':
        groups_data[:] = [group for group in groups_data if group['id'] != group_id]
    return redirect(reverse('index'))
