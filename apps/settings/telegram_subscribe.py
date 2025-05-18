from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


@csrf_exempt
@require_POST
def telegram_subscribe(request):
    try:
        # Парсим JSON-данные из тела запроса
        data = json.loads(request.body)
        telegram_username = data.get('telegram_username')
        notifications = data.get('notifications', {})

        # Проверка валидности данных
        if not telegram_username or not telegram_username.startswith('@'):
            return JsonResponse({'status': 'error', 'message': 'Invalid Telegram username'}, status=400)

        # Вывод данных в консоль Django
        print("Полученные данные:")
        print(f"Telegram Username: {telegram_username}")
        print("Notification Settings:")
        print(f"  New Posts: {notifications.get('new_posts', False)}")
        print(f"  Post Published: {notifications.get('post_published', False)}")
        print(f"  Tokens: {notifications.get('tokens', False)}")
        print(f"  Billing: {notifications.get('billing', False)}")

        # Возвращаем успешный ответ
        return JsonResponse({'status': 'success', 'message': 'Data received and logged'})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
