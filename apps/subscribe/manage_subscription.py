from django.views.decorators.http import require_POST
from project.language import translate, language
from django.http import JsonResponse
from django.utils import timezone
import json


@require_POST
def manage_subscription(request):
    """Обработка отмены или возобновления подписки"""
    global subscription_status
    try:
        lang = language(request)
        data = json.loads(request.body)
        action = data.get('action')
        reason = data.get('reason', '')
        cancellation_date = data.get('cancellation_date', timezone.now().strftime('%d.%m.%Y'))

        if action == 'cancel':
            subscription_status = False
            print(f"Подписка отменена. Причина: {reason}. Дата отмены: {cancellation_date}")
            return JsonResponse({
                'status': 'success',
                'message': translate('Подписка будет отменена', request.LANGUAGE_CODE) + f". {translate('Причина', request.LANGUAGE_CODE)}: {reason}",
                'new_status': f"{translate('Будет отменена', request.LANGUAGE_CODE)} {cancellation_date}",
                'button_text': translate('Возобновить подписку', request.LANGUAGE_CODE),
                'button_class': 'btn-outline-success',
                'badge_class': 'bg-warning'
            })
        elif action == 'renew':
            subscription_status = True
            print(f"Подписка возобновлена. Время: {timezone.now().strftime('%d.%m.%Y %H:%M:%S')}")
            return JsonResponse({
                'status': 'success',
                'message': translate('Подписка успешно возобновлена', request.LANGUAGE_CODE),
                'new_status': translate('Активна', request.LANGUAGE_CODE),
                'button_text': translate('Отменить подписку', request.LANGUAGE_CODE),
                'button_class': 'btn-outline-danger',
                'badge_class': 'bg-success'
            })
        else:
            return JsonResponse({'status': 'error', 'message': 'Недопустимое действие'}, status=400)
    except Exception as e:
        print(f"Ошибка в manage_subscription: {str(e)}")
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
