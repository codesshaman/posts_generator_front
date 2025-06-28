from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils import timezone
import random
import json


def get_postanalysis_text(lang):
    if lang == "ru":
        return "На основе анализа группы мы определили \
                основные темы, которые могут быть интересны \
                вашей аудитории. Вы можете отредактировать \
                предложенные темы или добавить свои."
    else:
        return "Based on the group analysis, we have identified \
                the main topics that may be of interest to you. \
                You can edit the suggested topics or add your own."

@csrf_exempt
def receive_content_plan(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            topics = data.get('topics', [])

            print('📥 Полученные темы:')
            for topic in topics:
                print(f"— Заголовок: {topic.get('title')}, Описание: {topic.get('description')}")

            return JsonResponse({'status': 'ok', 'message': 'Контент-план получен'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Неверный формат JSON'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Метод не поддерживается'}, status=405)



@csrf_exempt
@require_http_methods(["GET", "POST"])
def check_generate_status(request):
    if not request.session.session_key:
        request.session.create()

    if request.method == 'POST':
        # Перезапуск анализа (при нажатии кнопки "Сгенерировать" или "Перегенерировать")
        request.session['generate_started_at'] = timezone.now().timestamp()
        request.session['generate_delay'] = random.randint(5, 15)
        request.session.modified = True
        return JsonResponse({'status': False})

    # Проверка статуса
    if 'generate_started_at' not in request.session:
        return JsonResponse({'status': False})

    start_time = request.session['generate_started_at']
    delay = request.session['generate_delay']
    now = timezone.now().timestamp()
    elapsed = now - start_time

    if elapsed >= delay:
        request.session.pop('generate_started_at', None)
        request.session.pop('generate_delay', None)
        request.session.modified = True
        return JsonResponse({'status': True})

    return JsonResponse({'status': False})
