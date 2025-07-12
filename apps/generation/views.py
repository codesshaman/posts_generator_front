from project.cookies import set_cookie_if_not_exists
from project.language import translate, language
from .groups_data import groups_data, groups_topics
from django.shortcuts import render
from dotenv import load_dotenv
from .step_1 import *
from .step_2 import *
from .step_3 import *
from .step_4 import *
from .step_5 import *
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

@set_cookie_if_not_exists("user_language", lambda request: request.LANGUAGE_CODE or 'en')
def autogeneration(request):
    """Отображает страницу постов"""
    lang = language(request)
    muted_text = get_muted_text(lang)
    getanalysestext = get_analyses_text(lang)
    themes_analysis = themes_analysis_complete(lang)
    analysestext = analyses_text(lang)
    postanalysis = get_postanalysis_text(lang)
    topics_text = get_topics_text(lang)
    advice_text = get_advice(lang)
    prew_analysis_date = "18.06.25"
    generate_images = get_generate(lang)
    generated_text = get_generated_text(lang)
    succes_generated = get_succes_generated(lang)
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
        "prew_analysis_date": prew_analysis_date,
        "getanalysestext": getanalysestext,
        "analyses_text": analysestext,
        "themes_analysis": themes_analysis,
        "get_topics_text": topics_text,
        "postanalysis": postanalysis,
        "get_advice_text": advice_text,
        "generate_images": generate_images,
        "generated_text": generated_text,
        "succes_generated": succes_generated,
        "tokens_cost": 150,
        "some_subs_num": "5,432",
        "subject_1": translate("Маркетинг", lang),
        "subject_2": translate("Реклама", lang),
        "subject_3": translate("SMM", lang),
        "subject_4": translate("SEO", lang),
        "subject_5": translate("Контент", lang),
        "subject_6": translate("Продажи", lang),
        "percent_1": 28,
        "percent_2": 21,
        "percent_3": 17,
        "percent_4": 14,
        "percent_5": 11,
        "percent_6": 9,
        "groups_data": groups_data,
        'generated_topics': groups_topics,
    })
