from project.cookies import set_cookie_if_not_exists, set_cookies
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from project.language import translate, language
from django.core.paginator import Paginator
from .groups_data import groups_data
from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse
from dotenv import load_dotenv
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

    # Захардкоженные данные пользователя
    user_data = {
        "first_name": "Никита",
        "last_name": "Джигурда",
        "email": "n.jigurda@zdorovenniy.yaz",
        "phone": "+7 (999) 123-45-67",
    }

    # Получение данных о языке, часовом поясе и темной теме
    lang = language(request)
    selected_language = request.COOKIES.get('user_language', 'en')
    selected_timezone = request.COOKIES.get('user_timezone', 'Europe/Moscow')
    selected_darkmode = request.COOKIES.get('dark_mode', 'false')

    # Предполагается, что groups_data — это список или QuerySet
    # Если это не глобальная переменная, замените на ваш источник данных, например:
    # groups_data = YourModel.objects.all()
    paginator = Paginator(groups_data, 10)  # 10 групп на страницу

    # Получаем номер страницы из GET-параметра
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "posting/settings.html", {
        "user_data": user_data,
        "title": translate("Настройки", lang),
        "h2_text": translate("Настройки", lang),
        "selected_language": selected_language,
        "selected_timezone": selected_timezone,
        "selected_darkmode": selected_darkmode,
        "groups_data": page_obj,  # Передаем объект страницы вместо всего списка
        "page_obj": page_obj,  # Для пагинации в шаблоне
    })
