from django.views.decorators.http import require_POST
from project.language import translate, language
from django.shortcuts import redirect
from django.urls import reverse


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
    # {"id": 1, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    # {"id": 2, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    # {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    # {"id": 1, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    # {"id": 2, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    # {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    # {"id": 1, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    # {"id": 2, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    # {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    # {"id": 1, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    # {"id": 2, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    # {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
]

#############################################
############# Конец заглушкам ###############
#############################################


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