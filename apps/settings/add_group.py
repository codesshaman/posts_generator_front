from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
import json


@csrf_protect
def add_group(request):
    if request.method == 'POST':
        # Получаем данные из тела запроса
        data = json.loads(request.body)

        # Выводим данные в консоль (заглушка)
        print("Полученные данные группы:")
        print(data)

        # Возвращаем успешный JSON-ответ
        return JsonResponse({
            'status': 'success',
            'message': 'Группа успешно добавлена'
        })
    else:
        return JsonResponse({
            'status': 'error',
            'message': 'Метод не разрешен'
        }, status=405)
