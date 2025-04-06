def get_generated_text(lang):
    if lang == "ru":
        return "Мы сгенерировали посты на основе вашего \
                контент-плана. Вы можете отредактировать \
                каждый пост, изменить время публикации \
                или сгенерировать пост заново."
    else:
        return "We generated posts based on your \
                content plan. You can edit each post, \
                change the publication time, or generate \
                the post again."

def get_succes_generated(lang):
    if lang == "ru":
        return "Все посты успешно сгенерированы. Вы можете \
                запланировать их публикацию или сохранить \
                как черновики."
    else:
        return "All posts have been successfully generated. \
                You can schedule them to publish or save \
                them as drafts."
