from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Для теста; в проде используйте CSRF
import random
import json


@csrf_exempt  # Используйте только для теста
def check_completion(request):
    if request.method == 'GET':  # Или POST, если нужно
        # Рандомно решаем completed с вероятностью 25% true
        completed = random.random() < 0.25

        if completed:
            # Генерируем рандомную дельту токенов (аналогично Math.floor(Math.random() * 500) + 100)
            delta = random.randint(100, 599)

            # Аккумулируем в сессии (общее количество использованных токенов)
            total_tokens = request.session.get('total_tokens', 0) + delta
            request.session['total_tokens'] = total_tokens

            return JsonResponse({'completed': completed, 'tokens': total_tokens})
        else:
            return JsonResponse({'completed': completed})

    return JsonResponse({'status': 'error', 'message': 'Метод не поддерживается'}, status=405)
