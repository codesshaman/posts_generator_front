from django.views.decorators.http import require_POST
from project.language import translate, language
from django.http import JsonResponse
from django.utils import timezone
import json


# Маппинг номеров причин для сервера
REASON_MAPPING = {
    '1': 'too_expensive',
    '2': 'not_using',
    '3': 'missing_features',
    '4': 'found_alternative',
    '5': 'other'
}

@require_POST
def manage_subscription(request):
    """Обработка отмены или возобновления подписки"""
    global subscription_status
    try:
        data = json.loads(request.body)
        action = data.get('action')
        reason_number = data.get('reason_number', '')  # Получаем номер причины
        cancellation_date = data.get('cancellation_date', timezone.now().strftime('%d.%m.%Y'))

        if action == 'cancel':
            if not reason_number or reason_number not in REASON_MAPPING:
                return JsonResponse({
                    'status': 'error',
                    'message': translate('Пожалуйста, выберите причину отмены', request.LANGUAGE_CODE)
                }, status=400)
            subscription_status = False
            reason_text = REASON_MAPPING.get(reason_number, 'other')
            other_reason = data.get('other_reason', '') if reason_number == '5' else ''
            # Логируем с учетом текста для причины "Другое"
            log_message = f"Подписка отменена. Причина: {reason_number}"
            if reason_number == '5' and other_reason:
                log_message += f" ({other_reason})"
            log_message += f". Дата отмены: {cancellation_date}"
            print(log_message)
            return JsonResponse({
                'status': 'success',
                'message': translate('Подписка будет отменена', request.LANGUAGE_CODE) + f". {translate('Причина', request.LANGUAGE_CODE)}: {reason_text if reason_number != '5' else other_reason}",
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
