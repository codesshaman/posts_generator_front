def load_translations(file_path="translate.txt"):
    translations = {}
    with open(file_path, "r", encoding="utf-8") as f:
        first_line = f.readline().strip()
        if not first_line:
            return translations

        separator = first_line[0]  # Первый символ — разделитель

        for line in [first_line] + f.readlines():  # Читаем первую строку и остальные
            parts = line.strip().split(separator)
            if len(parts) > 1:
                key = parts[1]  # Первое слово после разделителя — ключ
                translations[key] = parts[1:]  # Остальные слова — переводы

    return translations


def translate(text, lang="en"):
    translations = load_translations()

    lang_index = {"ru": 0, "en": 1, "fr": 2}
    if text in translations and lang in lang_index:
        idx = lang_index[lang]
        if idx < len(translations[text]):  # Проверка, есть ли нужный перевод
            return translations[text][idx]
    return text  # Если нет перевода — вернуть исходное слово
