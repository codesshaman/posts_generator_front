from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Для теста; в проде используйте CSRF
import random
import json


@csrf_exempt  # Используйте только для теста
def check_completion(request):
    if request.method == 'GET':  # Или POST, если нужно
        # Рандомно решаем completed с вероятностью 25% true
        completed = random.random() < 0.25

        return JsonResponse({'completed': completed})

    return JsonResponse({'status': 'error', 'message': 'Метод не поддерживается'}, status=405)
