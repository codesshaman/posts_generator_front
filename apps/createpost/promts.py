from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Если хотите отключить CSRF для теста, но лучше не в проде


@csrf_exempt  # Используйте только для теста; в проде оставьте CSRF включенным
def generate_prompt(request):
    if request.method == 'POST':
        try:
            # Извлекаем prompt из JSON-тела запроса
            import json
            data = json.loads(request.body)
            prompt = data.get('prompt', '').strip()

            if not prompt:
                return JsonResponse({'status': 'error', 'message': 'Промпт пустой'}, status=400)

            # Заглушка: выводим в терминал
            print(f"Полученный промпт: {prompt}")

            # Возвращаем успешный ответ (можно расширить, например, сгенерировать текст)
            return JsonResponse({'status': 'success', 'message': 'Промпт выведен в терминал'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Неверный формат данных'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Метод не поддерживается'}, status=405)
