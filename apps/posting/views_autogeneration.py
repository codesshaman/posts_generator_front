from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
import os

# Устанавливаем язык
lang = "en"

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

def get_muted_text(lang):
    if lang == "ru":
        return "Выберите группу или страницу, на " \
                "основе которой будет проведен анализ " \
                "и сгенерированы посты. Вы можете " \
                "выбрать одну из уже подключенных " \
                "групп или добавить новую."
    else:
        return "Select a group or page on the basis " \
                "of which the analysis will be conducted " \
                "and posts will be generated." \
                " You can select one of the already " \
                "connected groups or add a new one."


# Create your views here.
def autogeneration(request):
    """Отображает страницу постов"""
    lang = language(request)
    muted_text = get_muted_text(lang)
    if debug:
        print("Отображаем страницу автогенерации")
    return render(request, "posting/autogeneration.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Автогенерация постов", lang),
        "h2_text": translate("Автогенерация постов", lang),
        "muted_text": muted_text,
        "marketing": translate("Маркетинг и реклама", lang),
        "interior_design": translate("Дизайн интерьера", lang),
        "it_and_technologys": translate("IT и технологии", lang),
        "facebook": "Facebook",
        "instagram": "Instagram",
        "boosty": "Boosty",
        "subscribers": translate("Подписчиков", lang),
        "some_subs_num": "5,432",
        "add_new_group": translate("Добавить новую группу", lang),
        "add_for_analysis": translate("Подключите новую группу или страницу для анализа", lang),
        "next": translate("Далее", lang),
        "back_to_posts": translate("Назад к постам", lang)
    })
