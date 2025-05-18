from django.views.decorators.http import require_POST
from django.http import JsonResponse
import re


@require_POST
def update_password(request):
    """Обрабатывает AJAX-запрос для смены пароля."""
    try:
        # Получаем данные из формы
        current_password = request.POST.get('current_password')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        # Заглушка: случайный текущий пароль (для примера)
        placeholder_password = 'hardcode'
        print(f"Заглушка текущего пароля: {placeholder_password}")

        # Проверка текущего пароля
        if current_password != placeholder_password:
            print("Ошибка: Неверный текущий пароль")
            return JsonResponse({
                "status": "error",
                "message": "Неверный текущий пароль"
            }, status=400)

        # Проверка совпадения нового пароля и подтверждения
        if new_password != confirm_password:
            print("Ошибка: Новый пароль и подтверждение не совпадают")
            return JsonResponse({
                "status": "error",
                "message": "Новый пароль и подтверждение не совпадают"
            }, status=400)

        # Проверка требований к новому паролю
        if len(new_password) < 8:
            print("Ошибка: Пароль должен содержать минимум 8 символов")
            return JsonResponse({
                "status": "error",
                "message": "Пароль должен содержать минимум 8 символов"
            }, status=400)
        if not re.search(r'[A-Z]', new_password):
            print("Ошибка: Пароль должен содержать хотя бы одну заглавную букву")
            return JsonResponse({
                "status": "error",
                "message": "Пароль должен содержать хотя бы одну заглавную букву"
            }, status=400)
        if not re.search(r'\d', new_password):
            print("Ошибка: Пароль должен содержать хотя бы одну цифру")
            return JsonResponse({
                "status": "error",
                "message": "Пароль должен содержать хотя бы одну цифру"
            }, status=400)
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', new_password):
            print("Ошибка: Пароль должен содержать хотя бы один специальный символ")
            return JsonResponse({
                "status": "error",
                "message": "Пароль должен содержать хотя бы один специальный символ"
            }, status=400)

        # Если все проверки пройдены
        print("Пароль успешно изменён")
        return JsonResponse({
            "status": "success",
            "message": "Пароль успешно изменён"
        })

    except Exception as e:
        print(f"Ошибка: {str(e)}")
        return JsonResponse({
            "status": "error",
            "message": f"Произошла ошибка: {str(e)}"
        }, status=500)