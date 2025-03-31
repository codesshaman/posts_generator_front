from project.language import translate


# Устанавливаем язык
lang = "en"

def menu_context(request):
    return {
        "h2_text": translate("Мои посты", lang),
        "create_post": translate("Создать пост", lang),
        "pub_queque": translate("Очередь публикаций", lang),
        "autogen": translate("Автогенерация постов", lang),
        "my_subscr": translate("Моя подписка", lang),
        "settings": translate("Настройки", lang),
        "coins": translate("Коины", lang),
        "used": translate("Использовано", lang),
        "purchase": translate("Купить коины", lang),
        "exit": translate("Выход", lang),
        'coins_used': 490,
        'coins_balance': 1000,
    }