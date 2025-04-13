from functools import wraps


def set_cookie_if_not_exists(cookie_name, cookie_value_func, max_age=365 * 24 * 60 * 60):
    """Возвращает декоратор для установки cookie, если cookie нет."""
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            response = view_func(request, *args, **kwargs)
            if cookie_name not in request.COOKIES:
                # Вызываем функцию для получения значения куки
                cookie_value = cookie_value_func(request) if callable(cookie_value_func) else cookie_value_func
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


from functools import wraps

def replace_cookie_if_not_exists(cookie_name, cookie_value_func, max_age=365 * 24 * 60 * 60):
    """Возвращает декоратор для установки или замены cookie."""
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(request, *args, **kwargs):
            response = view_func(request, *args, **kwargs)
            # Вызываем функцию для получения значения куки
            cookie_value = cookie_value_func(request) if callable(cookie_value_func) else cookie_value_func
            print(f"Устанавливаю/заменяю cookie: {cookie_name}={cookie_value}")
            response.set_cookie(
                cookie_name,
                cookie_value,
                max_age=max_age,
                path='/',
                secure=False,  # Для локальной разработки, в продакшене установите True
                httponly=True,
                samesite='Lax'
            )
            return response
        return wrapper
    return decorator
