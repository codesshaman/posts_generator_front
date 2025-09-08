from project.language import translate, language


def scheduler(request):
    lang = language(request)
    return {
        "by_pub_date": translate("По дате публикации", lang),
        "tomorrow": translate("Завтра", lang),
        "this_week": translate("Эта неделя", lang),
        "next_week": translate("Следующая неделя", lang),
        "nearest_first": translate("Сначала ближайшие", lang),
        "latest_first": translate("Сначала последние", lang),
        "all_platforms": translate("Все платформы", lang),
        "add_to_queue": translate("Добавить в очередь", lang),
        "pub_cal": translate("Календарь публикаций", lang),
        "schad_pub": translate("Календарь запланированных публикаций", lang),
        "up_pub": translate("Ближайшие публикации", lang),
        "planed": translate("Запланировано", lang),
        "for_next_week": translate("на следующую неделю", lang),
        "for_next_month": translate("на следующий месяц", lang),
        "without_image": translate("Без изображения", lang),
        "change_date": translate("Изменить дату", lang),
        "publish_now": translate("Опубликовать сейчас", lang),
        "change_pub_date": translate("Изменить дату публикации", lang),
        "pub_date_time": translate("Дата и время публикации", lang),
        "repeat_pub": translate("Повторять публикацию", lang),
        "not_repeat": translate("Не повторять", lang),
        "daily": translate("Ежедневно", lang),
        "weekly": translate("Еженедельно", lang),
        "monthly": translate("Ежемесячно", lang),
        "save": translate("Сохранить", lang),
        "right_now": translate("Вы уверены, что хотите опубликовать этот пост прямо сейчас?", lang),
    }
