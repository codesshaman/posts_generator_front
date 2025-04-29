from project.language import translate, language


def login_page(request):
    lang = language(request)
    return {
        "title": translate("Страница входа", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
    }


def reset_page(request):
    lang = language(request)
    return {
        "post_title_2": translate("Сброс пароля", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
        "h2_text": translate("Мосты", lang),
    }
