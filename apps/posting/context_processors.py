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
        "publish": translate("Опубликовано", lang),
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


def create_post(request):
    lang = language(request)
    return {
        "post_title_2": translate("Заголовок поста", lang),
        "should_be": translate("Заголовок должен быть информативным и привлекательным", lang),
        "platform": translate("Платформа", lang),
        "post_content": translate("Содержание поста", lang),
        "max_length": translate("Максимальная длина", lang),
        "max_length_num": 2000,
        "characters_for": translate("символов для", lang),
        "network": "LinkedIn",
        "post_image": translate("Изображение поста", lang),
        "image_drop": translate("Перетащите изображение сюда или", lang),
        "choose_file": translate("выберите файл", lang),
        "or": translate("или", lang),
        "max": translate("максимум", lang),
        "ai_generation": translate("Сгенерировать с помощью ИИ", lang),
        "choice": translate("Или выберите из предложенных", lang),
        "pub_settings": translate("Настройки публикации", lang),
        "schedule_post": translate("Запланировать публикацию", lang),
        "pub_date": translate("Дата публикации", lang),
        "pub_time": translate("Время публикации", lang),
        "save_as_draft": translate("Сохранить как черновик", lang),
        "allow_comments": translate("Разрешить комментарии", lang),
        "hashtags": translate("Хэштеги", lang),
        "add_hashtags": translate("Добавьте релевантные хэштеги для увеличения охвата", lang),
        "preview": translate("Предпросмотр", lang),
        "generate": translate("Сгенерировать", lang),
        "save_draft": translate("Сохранить как черновик", lang),
        "publish": translate("Опубликовать", lang),
        "post_preview": translate("Предпросмотр поста", lang),
        "post_title": translate("Заголовок поста", lang),
        "post_content_here": translate("Содержание поста будет отображаться здесь", lang),
        "close": translate("Закрыть", lang),
        "gen_ai": translate("Генерация поста с помощью ИИ", lang),
        "what_post": translate("Опишите, какой пост вы хотите создать", lang),
        "gen_par": translate("Параметры генерации", lang),
        "style": translate("Стиль", lang),
        "professional": translate("Профессиональный", lang),
        "friendly": translate("Дружелюбный", lang),
        "informal": translate("Неформальный", lang),
        "enthusiastic": translate("Энтузиастичный", lang),
        "informative": translate("Информативный", lang),
        "length": translate("Длина", lang),
        "short": translate("Короткий (100-200 слов)", lang),
        "medium": translate("Средний (200-400 слов)", lang),
        "long": translate("Длинный (400-600 слов)", lang),
        "loading": translate("Загрузка", lang),
        "post_generation": translate("Генерация поста", lang),
        "generated_post": translate("Сгенерированный пост", lang),
        "regenerate": translate("Сгенерировать заново", lang),
        "use": translate("Использовать", lang),
        "сoins_used": translate("Использовано коинов", lang),
        "cancel": translate("Отмена", lang),
        "size_must": translate("Размер файла не должен превышать 5MB", lang),
        "enter_title": translate("Пожалуйста, введите заголовок поста", lang),
        "enter_content": translate("ожалуйста, введите содержание поста", lang),
        "incorrect_pub_date": translate("Дата публикации не верна", lang),
        "success_publish": translate("Пост успешно опубликован", lang),
        "draft_saved": translate("Черновик успешно сохранён", lang),
        "planed": translate("Пост запланирован к публикации", lang),
        "ai_image_gen": translate("Генерация изображения с ИИ", lang),
        "describe": translate("Опишите желаемое изображение", lang),
        "example_1": translate("Например: Профессиональный бизнесмен", lang),
        "example_2": translate("в офисе работает за компьютером,", lang),
        "example_3": translate("современный стиль, яркие цвета", lang),
        "status": translate("Стиль изображения", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
        "status": translate("Статус", lang),
    }
