import os

def load_translations(file_path="translate.txt"):
    translations = {}
    with open(file_path, "r", encoding="utf-8") as f:
        first_line = f.readline().strip()
        if not first_line:
            return translations

        separator = first_line[0]
        parts = first_line.split(separator)

        if len(parts) > 1:
            key = parts[1]
            translations[key] = parts[2:]

        # Читаем оставшиеся строки
        for line in f:
            parts = line.strip().split(separator)
            if len(parts) > 1:
                key = parts[1]
                translations[key] = parts[2:]

    return translations


def translate(text, lang="en"):
    translations = load_translations()

    lang_index = {"ru": 0, "en": 1, "fr": 2}
    if text in translations and lang in lang_index:
        return translations[text][lang_index[lang] - 1]
    return text
