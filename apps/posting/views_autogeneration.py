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


def get_analyses_text(lang):
    if lang == "ru":
        return "Мы проанализируем выбранную группу, \
                чтобы определить основную тематику, \
                интересы аудитории и наиболее \
                популярные темы постов. На основе \
                этого анализа будут предложены темы \
                для генерации постов."
    else:
        return "We will analyze the selected group to \
                determine the main topics, audience \
                interests and the most popular post \
                topics. Based on this analysis, topics \
                for generating posts will be suggested."

def analyses_text(lang):
    if lang == "ru":
        return "Анализ может занять некоторое время \
                в зависимости от размера группы и \
                количества постов. Пожалуйста, не \
                закрывайте страницу во время анализа."
    else:
        return "The analysis may take some time \
                depending on the size of the group \
                and the number of posts. Please do not \
                close the page during the analysis."

def themes_analysis_complete(lang):
    if lang == "ru":
        return "Мы проанализировали контент группы \
                и определили основные темы"
    else:
        return "We analyzed the group's content \
                and identified the main topics"

# Create your views here.
def autogeneration(request):
    """Отображает страницу постов"""
    lang = language(request)
    muted_text = get_muted_text(lang)
    getanalysestext = get_analyses_text(lang)
    themes_analysis = themes_analysis_complete(lang)
    analysestext = analyses_text(lang)
    if debug:
        print("Отображаем страницу автогенерации")
    return render(request, "posting/autogeneration.html", {
        # "posts": initial_posts,
        # "has_more": has_more,
        "title": translate("Автогенерация постов", lang),
        "h2_text": translate("Автогенерация постов", lang),
        "muted_text": muted_text,
        "facebook": "Facebook",
        "instagram": "Instagram",
        "boosty": "Boosty",
        "getanalysestext": getanalysestext,
        "analyses_text": analysestext,
        "themes_analysis": themes_analysis,
        "tokens_cost": 150,
        "some_subs_num": "5,432",
        "subject_1": translate("Маркетинг", lang),
        "subject_2": translate("Реклама", lang),
        "subject_3": translate("SMM", lang),
    })
