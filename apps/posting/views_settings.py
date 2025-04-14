from project.cookies import set_cookie_if_not_exists, set_cookies
from django.views.decorators.http import require_POST
from project.language import translate, language
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from dotenv import load_dotenv
from datetime import datetime
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


@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def settings(request):
    """Отображает страницу настроек"""
    if debug:
        print("Отображаем страницу настроек")
    lang = language(request)
    return render(request, "posting/settings.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Настройки", lang),
        "h2_text": translate("Настройки", lang),
    })
