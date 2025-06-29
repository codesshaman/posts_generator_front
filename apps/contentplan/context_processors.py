from project.language import translate, language


def contentplan(request):
    lang = language(request)
    return {
        "group_selection": translate("Выбор группы", lang),
        "analysis": translate("Анализ", lang),
    }