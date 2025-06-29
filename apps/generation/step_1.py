from django.http import JsonResponse
from django.utils import timezone
import random
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


def check_analysis_status(request):
    # Если это первый вызов, установить время старта и задержку
    if 'analysis_started_at' not in request.session:
        request.session['analysis_started_at'] = timezone.now().timestamp()
        request.session['analysis_delay'] = random.randint(5, 20)
        request.session.modified = True

    start_time = request.session['analysis_started_at']
    delay = request.session['analysis_delay']
    now = timezone.now().timestamp()

    elapsed = now - start_time

    if elapsed >= delay:
        # Очистить состояние анализа
        request.session.pop('analysis_started_at', None)
        request.session.pop('analysis_delay', None)
        return JsonResponse({'status': True})

    return JsonResponse({'status': False})
