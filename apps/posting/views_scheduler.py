from project.language import translate, language
from django.shortcuts import render
from dotenv import load_dotenv
from datetime import datetime
import os


# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

# Create your views here.
def scheduler(request):
    """Отображает страницу расписания постов"""
    lang = language(request)
    if debug:
        print("Отображаем страницу расписания постов")
    return render(request, "posting/scheduler.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Очередь публикаций", lang),
        "h2_text": translate("Очередь публикаций", lang),
        "publish_text": translate("Публикация: ", lang),
        "read_button": translate("Читать статью", lang),
        "load_more_text": translate("Загрузить ещё", lang),
        "no_more_posts_text": translate("Больше постов нет", lang),
        "publish_date": "20.05.2023",
        "publish_time": "09:00",
    })