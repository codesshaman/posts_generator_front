from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from project.language import translate, language
from django.shortcuts import redirect
from django.http import JsonResponse
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
    {"id": 1, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 2, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 3, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг завтра", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 4, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Маркетинг послезавтра", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 5, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг будущего", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 6, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Бизнес дома", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 7, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Бизнес в гараже", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 8, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Бизнес на даче", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 9, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Каннибализм и цветоводство", "subscribers": "8", "group_id": "@cannibal_flowers"},
    {"id": 10, "category_id": 1, "category_text":get_category_text(1), "platform_style": get_platform_style(1), "platform_text": get_platform_text(1), "title": "Технологии будущего", "subscribers": "15,432", "group_id": "club123456789 "},
    {"id": 11, "category_id": 2, "category_text":get_category_text(2), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Маркетинг сегодня", "subscribers": "3,210", "group_id": "@marketing_today"},
    {"id": 12, "category_id": 3, "category_text":get_category_text(3), "platform_style": get_platform_style(2), "platform_text": get_platform_text(2), "title": "Мемы про котиков", "subscribers": "8", "group_id": "@cannibal_flowers"},
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

@csrf_exempt
def delete_group(request, group_id):
    if request.method == 'POST':
        # Найти группу по ID
        group = next((g for g in groups_data if g["id"] == int(group_id)), None)
        if group:
            print(f"Удаляемая группа: {group}")
            return JsonResponse({"status": "ok", "message": "Группа найдена и напечатана в консоль."})
        else:
            print(f"Группа с ID {group_id} не найдена.")
            return JsonResponse({"status": "error", "message": "Группа не найдена."}, status=404)
    return JsonResponse({"status": "error", "message": "Только POST."}, status=400)
