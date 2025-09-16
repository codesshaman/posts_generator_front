from project.language import translate, language


def all_posts(request):
    lang = language(request)
    return {
        "title": translate("Мои посты", lang),
        "h2_text": translate("Мои посты", lang),
        "exit": translate("Выйти", lang),
        "by_date": translate("По дате", lang),
        "all_dates": translate("Все даты", lang),
        "today": translate("Сегодня", lang),
        "last_7_days": translate("Последние 7 дней", lang),
        "last_30_days": translate("Последние 30 дней", lang),
        "last_90_days": translate("Последние 90 дней", lang),
        "new_first": translate("Сначала новые", lang),
        "old_first": translate("Сначала старые", lang),
        "all_platforms": translate("Все платформы", lang),
        "vk": translate("Вконтакте", lang),
        "tg": translate("Телеграм", lang),
        "email": "Email",
        "boosty": translate("Бусти", lang),
        "all_statuses": translate("Все статусы", lang),
        "published": translate("Опубликовано", lang),
        "draft": translate("Черновик", lang),
        "queue": translate("В очереди", lang),
        "delete_button": translate("Удалить", lang),
        "publish_text": translate("Публикация", lang),
        "edit_button": translate("Редактировать", lang),
        "load_more_text": translate("Загрузить ещё", lang),
        "no_more_posts_text": translate("Больше постов нет", lang),
        "post_title": translate("Заголовок", lang),
        "post_descr": translate("Описание", lang),
        "platform": translate("Платформа", lang),
        "pub_date": translate("Дата публикации", lang),
        "image": translate("Изображение", lang),
        "status": translate("Статус", lang),
        "empty": translate("Оставьте пустым для немедленной публикации", lang),
        "cancel": translate("Отмена", lang),
        "save_changes": translate("Сохранить изменения", lang),
        "shure": translate("Вы уверены, что хотите удалить этот пост? Это действие нельзя будет отменить", lang),
        "del_confirm": translate("Подтверждение удаления", lang),
        "post_editing": translate("Редактирование поста", lang),
    }

def platform(request):
    return {'selected_platform': request.GET.get('platform', 'all')}

def date_filter(request):
    return {'selected_date_filter': request.GET.get('date', 'all')}

def status_filter(request):
    return {'selected_status': request.GET.get('status', 'all')}