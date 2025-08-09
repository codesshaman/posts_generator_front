from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Для теста; в проде используйте CSRF
import random
import json


TOTAL_COINS = 5000  # Максимум коинов за сессию

@csrf_exempt
def get_initial_tokens(request):
    """Возвращает стартовое количество токенов при загрузке страницы"""
    total_tokens = request.session.get('total_tokens', 0)
    remaining = TOTAL_COINS - total_tokens
    return JsonResponse({'total_coins': TOTAL_COINS, 'remaining': remaining})

@csrf_exempt  # Используйте только для теста
def check_completion(request):
    if request.method == 'GET':  # Или POST, если нужно
        # Рандомно решаем completed с вероятностью 25% true
        completed = random.random() < 0.25

        if completed:
            # Генерируем рандомную дельту токенов (аналогично Math.floor(Math.random() * 500) + 100)
            delta = random.randint(100, 599)

            # Аккумулируем в сессии (общее количество использованных токенов)
            used = request.session.get('total_tokens', 0) + delta
            if used > TOTAL_COINS:
                used = TOTAL_COINS  # Не превышаем максимум
            request.session['total_tokens'] = used

            remaining = TOTAL_COINS - used
            return JsonResponse({
                'completed': completed,
                'tokens': used,
                'remaining': remaining
            })
        else:
            return JsonResponse({'completed': completed})

    return JsonResponse({'status': 'error', 'message': 'Метод не поддерживается'}, status=405)
