from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Используем временно для упрощения, в продакшене лучше использовать CSRF
def update_tariff(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            tariff_name = data.get('tariff_name')
            price = data.get('price')
            period = data.get('period')
            next_billing_date = data.get('next_billing_date')

            # Выводим данные в терминал (заглушка)
            print("Получены данные о переходе на тариф:")
            print(f"Тариф: {tariff_name}")
            print(f"Стоимость: {price}")
            print(f"Период оплаты: {period}")
            print(f"Дата следующего списания: {next_billing_date}")

            # Возвращаем успешный ответ
            return JsonResponse({
                'status': 'success',
                'message': f'Тариф {tariff_name} успешно обновлен'
            })
        except Exception as e:
            print(f"Ошибка при обработке запроса: {str(e)}")
            return JsonResponse({
                'status': 'error',
                'message': 'Ошибка при обновлении тарифа'
            }, status=400)
    return JsonResponse({
        'status': 'error',
        'message': 'Недопустимый метод запроса'
    }, status=405)