from functools import wraps

def set_cookie_if_not_exists(cookie_name, cookie_value_func, max_age=365 * 24 * 60 * 60):
    """Возвращает декоратор для установки cookie, если его нет."""
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            response = view_func(request, *args, **kwargs)
            print(f"Проверяю cookie: {cookie_name} в {request.COOKIES}")
            if cookie_name not in request.COOKIES:
                # Вызываем функцию для получения значения куки
                cookie_value = cookie_value_func(request) if callable(cookie_value_func) else cookie_value_func
                print(f"Устанавливаю cookie: {cookie_name}={cookie_value}")
                response.set_cookie(
                    cookie_name,
                    cookie_value,
                    max_age=max_age,
                    path='/',
                    secure=False,  # Для локальной разработки, в продакшене установите True
                    httponly=True,
                    samesite='Lax'
                )
            else:
                print(f"Cookie {cookie_name} уже существует: {request.COOKIES[cookie_name]}")
            return response
        return wrapper
    return decorator

def language(request):
    """Возвращает язык из куки или устанавливает новый."""
    print("Cookies в запросе:", request.COOKIES)
    if "user_language" not in request.COOKIES:
        print("Задаю язык в cookies")
        accept_language = request.LANGUAGE_CODE or 'en'  # Запасное значение
        print(f"Выбранный язык: {accept_language}")
        return accept_language
    else:
        print("Возвращаю язык из cookies")
        return request.COOKIES.get('user_language')


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
