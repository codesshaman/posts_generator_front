from project.cookies import set_cookie_if_not_exists, set_cookies
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from project.language import translate, language
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from dotenv import load_dotenv
from datetime import datetime
import random
import string
import json
import re
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

@require_POST
def update_settings(request):
    print("Обработчик update_settings вызван")
    """Обрабатывает AJAX-запрос для обновления настроек."""
    try:
        # Получаем данные из формы
        languadge = request.POST.get("language", "en")
        timezone = request.POST.get("timezone", "Europe/Moscow")
        dark_mode = request.POST.get("dark_mode") == "on"

        # Проверка валидности (опционально)
        valid_languages = ["ru", "en"]
        if languadge not in valid_languages:
            return JsonResponse({"status": "error", "message": "Недопустимый язык"}, status=400)

        # Устанавливаем куки
        response = JsonResponse({
            "status": "success",
            "message": "Настройки успешно обновлены",
            "redirect_url": reverse("settings")
        })
        print("Настройки успешно обновлены")
        set_cookies(response, "user_language", languadge)
        set_cookies(response, "user_timezone", timezone)
        dark_mode_set = "true" if dark_mode else "false"
        set_cookies(response, "dark_mode", dark_mode_set)
        return response

    except Exception as e:
        return JsonResponse({"status": "error", "message": f"Ошибка: {str(e)}"}, status=500)

@ensure_csrf_cookie
@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def settings(request):
    """Отображает страницу настроек"""
    if debug:
        print("Отображаем страницу настроек")
    """Отображение формы с захардкоженными данными."""
    user_data = {
        "first_name": "Никита",
        "last_name": "Джигурда",
        "email": "n.jigurda@zdorovenniy.yaz",
        "phone": "+7 (999) 123-45-67",
    }
    lang = language(request)
    selected_language = request.COOKIES.get('user_language', 'en')
    selected_timezone = request.COOKIES.get('user_timezone', 'Europe/Moscow')
    selected_darkmode = request.COOKIES.get('dark_mode', 'false')
    return render(request, "posting/settings.html", {
        "user_data": user_data,
        "title": translate("Настройки", lang),
        "h2_text": translate("Настройки", lang),
        'selected_language': selected_language,
        'selected_timezone': selected_timezone,
        'selected_darkmode': selected_darkmode,
    })


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
