from project.language import translate, language


def menu_context(request):
    lang = language(request)
    return {
        "project_name": "ContentAI",
        "my_posts_menu": translate("Мои посты", lang),
        "create_post_menu": translate("Создать пост", lang),
        "pub_queque_menu": translate("Очередь публикаций", lang),
        "autogen_menu": translate("Автогенерация постов", lang),
        "my_subscr_menu": translate("Моя подписка", lang),
        "settings_menu": translate("Настройки", lang),
        "coins_menu": translate("Коины", lang),
        "used_menu": translate("Использовано", lang),
        "purchase_menu": translate("Купить коины", lang),
        "exit_menu": translate("Выход", lang),
        'coins_used_menu': 490,
        'coins_balance_menu': 1000,
    }