from project.language import translate, language


def login_page(request):
    lang = language(request)
    return {
        "title": translate("Страница входа", lang),
        "h2_text": translate("Вход/Регистрация", lang),
        "site_name": translate("ContentAI", lang),
        "entrance_text": translate("Войдите в свой аккаунт или создайте новый", lang),
        "login_text": translate("Вход", lang),
        "welcome_text": translate("Добро пожаловать", lang),
        "register_text": translate("Регистрация", lang),
        "email_text": translate("Email", lang),
        "password_text": translate("Пароль", lang),
        "quick_enter": translate("Быстрый вход через", lang),
        "vk_text": translate("Вконтакте", lang),
        "tg_text": translate("Телеграм", lang),
        "secure_auth": translate("Безопасная авторизация", lang),
        "quick_acess": translate("Быстрый доступ", lang),
        "without_reg": translate("Без дополнительной регистрации", lang),
        "remmbr_me": translate("Запомнить меня", lang),
        "forgot_pwd": translate("Забыли пароль", lang),
        "enter": translate("Войти", lang),
        "enter_email": translate("Введите ваш email", lang),
        "enter_pwd": translate("Введите ваш пароль", lang),
        "name_text": translate("Имя", lang),
        "enter_name": translate("Введите ваше имя", lang),
        "min_8_chars": translate("Минимум 8 символов, включая буквы и цифры", lang),
        "agree_text": translate("Я согласен с", lang),
        "terms_text": translate("условиями использования", lang),
        "reg_text": translate("Зарегистрироваться", lang),
        "all_rights": translate("Все права защищены", lang),
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
