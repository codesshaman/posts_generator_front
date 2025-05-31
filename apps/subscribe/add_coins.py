from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

@require_POST
def add_coins(request):
    try:
        data = json.loads(request.body)
        coins = data.get('coins')

        # Здесь ваша логика обработки количества коинов
        print(f"Получено коинов: {coins}")  # Заглушка для вывода в консоль

        return JsonResponse({
            'status': 'success',
            'message': f'Добавлено {coins} коинов'
        })
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)
