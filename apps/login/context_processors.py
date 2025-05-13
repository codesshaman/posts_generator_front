from project.language import translate, language


def login_page(request):
    lang = language(request)
    return {
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
        "pwd_recov": translate("Восстановление пароля", lang),
        "email_for_rec": translate("Введите ваш email для получения инструкций по восстановлению пароля", lang),
        "send_instr": translate("Отправить инструкции", lang),
        "go_back": translate("Вернуться к авторизации", lang),
        "instr_send": translate("Инструкции отправлены", lang),
        "we_send": translate("Мы отправили инструкции по восстановлению пароля на ваш email. Пожалуйста, проверьте вашу почту", lang),
        "not_receive": translate("Не получили письмо", lang),
        "resend": translate("Отправить повторно", lang),
        "new_pwd": translate("Новый пароль", lang),
        "enter_new_pwd": translate("Введите новый пароль", lang),
        "confirm_new_pwd": translate("Подтвердите новый пароль", lang),
        "pwd_confirmation": translate("Подтверждение пароля", lang),
        "save_new_pwd": translate("Сохранить новый пароль", lang),
        "suc_chng": translate("Пароль успешно изменён", lang),
        "your_pwd_chng": translate("Ваш пароль был успешно изменен. Теперь вы можете войти в систему, используя новый пароль", lang),
        "go_to_auth": translate("Перейти к авторизации", lang),
    }
