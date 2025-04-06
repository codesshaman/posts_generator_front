def get_topics_text(lang):
    if lang == "ru":
        return "Мы создали контент-план на основе выбранных \
                тем. Вы можете изменить порядок постов, \
                перетаскивая их, отредактировать заголовки \
                или удалить ненужные посты."
    else:
        return "We created a content plan based on the \
                selected topics. You can rearrange posts \
                by dragging them, edit titles, or delete \
                unnecessary posts."

def get_advice(lang):
    if lang == "ru":
        return "Вы можете изменить порядок постов, \
                перетаскивая их за иконку"
    else:
        return "You can change the order of posts \
                by dragging them by the icon"

def get_generate(lang):
    if lang == "ru":
        return "Автоматически сгенерировать \
                изображения для постов"
    else:
        return "Automatically generate \
                images for posts"
