from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Если CSRF не используется, иначе настройте CSRF
import json


@csrf_exempt  # Используйте это только для тестирования; в продакшене настройте CSRF правильно
def get_image_promt(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt')
            style = data.get('style')
            ratio = data.get('ratio')

            # Выводим информацию в командную строку (консоль сервера Django) как заглушка
            print(f"Полученный промпт: {prompt}")
            print(f"Полученный стиль: {style}")
            print(f"Полученное соотношение: {ratio}")

            # Возвращаем успешный ответ (можно расширить для реальной логики генерации)
            return JsonResponse({'status': 'success', 'message': 'Генерация инициирована'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Неверный формат JSON'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Только POST-запросы разрешены'}, status=405)
