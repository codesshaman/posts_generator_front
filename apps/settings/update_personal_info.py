from django.views.decorators.http import require_POST
from django.http import JsonResponse


@require_POST
def update_personal_info(request):
    """Заглушка для обработки данных формы PersonalInfo"""
    try:
        first_name = request.POST.get("firstName")
        last_name = request.POST.get("lastName")
        email = request.POST.get("email")
        phone = request.POST.get("phone")

        # Просто логируем, можно будет потом сохранить
        print("Получены данные формы:")
        print(f"Имя: {first_name}")
        print(f"Фамилия: {last_name}")
        print(f"Email: {email}")
        print(f"Телефон: {phone}")

        return JsonResponse({"status": "success", "message": "Данные успешно сохранены"})

    except Exception as e:
        return JsonResponse({"status": "error", "message": f"Ошибка: {str(e)}"}, status=500)
