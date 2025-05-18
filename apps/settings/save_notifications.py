from django.views.decorators.http import require_POST
from django.http import JsonResponse
import json


@require_POST
def save_notifications(request):
    try:
        data = json.loads(request.body)

        # Заглушка: просто выводим в консоль
        print("Полученные настройки уведомлений:")
        for key, value in data.items():
            print(f"{key}: {'включено' if value else 'выключено'}")

        return JsonResponse({"status": "ok"})
    except Exception as e:
        print("Ошибка при разборе данных:", str(e))
        return JsonResponse({"status": "error", "message": str(e)}, status=400)