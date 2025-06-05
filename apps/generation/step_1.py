from django.http import JsonResponse
import json


def get_muted_text(lang):
    if lang == "ru":
        return "Выберите группу или страницу, на " \
                "основе которой будет проведен анализ " \
                "и сгенерированы посты. Вы можете " \
                "выбрать одну из уже подключенных " \
                "групп или добавить новую."
    else:
        return "Select a group or page on the basis " \
                "of which the analysis will be conducted " \
                "and posts will be generated." \
                " You can select one of the already " \
                "connected groups or add a new one."


def process_group_selection(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        group_id = data.get('group_id')
        platform_text = data.get('platform_text')

        print(f"Получен group_id: {group_id}, platform_text: {platform_text}")
        return JsonResponse({'status': 'ok'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)