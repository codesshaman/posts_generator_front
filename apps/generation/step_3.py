from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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