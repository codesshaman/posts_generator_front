from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.shortcuts import render


users_db = {
    "testuser@mail.ru": "test123WS$"  # Пример: имя пользователя и пароль
}

def login(request):
    return render(request, 'login/login.html', {
        'title': 'Base Page'
    })

def reset_password(request):
    return render(request, 'login/reset_password.html', {
        'title': 'Base Page'
    })

@require_POST
def auth_action(request):
    """Обрабатывает AJAX-запросы для входа и регистрации с использованием заглушки."""
    try:
        action = request.POST.get('action')
        username = request.POST.get('email')  # Используем email как username
        password = request.POST.get('password')

        if not username or not password:
            print(f"Ошибка: Пустое имя пользователя или пароль")
            return JsonResponse({
                "status": "error",
                "message": "Email и пароль обязательны"
            }, status=400)

        if action == 'login':
            # Проверка входа
            if username in users_db and users_db[username] == password:
                print(f"Вход выполнен: {username}")
                return JsonResponse({
                    "status": "success",
                    "message": "Вход выполнен успешно"
                })
            else:
                print(f"Ошибка входа: неверные данные для {username}")
                return JsonResponse({
                    "status": "error",
                    "message": "Неверный email или пароль"
                }, status=400)

        elif action == 'register':
            # Проверка регистрации
            if username in users_db:
                print(f"Ошибка регистрации: пользователь {username} уже существует")
                return JsonResponse({
                    "status": "error",
                    "message": "Пользователь с таким email уже существует"
                }, status=400)

            # Добавляем нового пользователя в заглушку
            users_db[username] = password
            print(f"Регистрация успешна: {username}")
            return JsonResponse({
                "status": "success",
                "message": "Регистрация выполнена успешно"
            })

        else:
            print(f"Ошибка: Недопустимое действие {action}")
            return JsonResponse({
                "status": "error",
                "message": "Недопустимое действие"
            }, status=400)

    except Exception as e:
        print(f"Ошибка: {str(e)}")
        return JsonResponse({
            "status": "error",
            "message": f"Произошла ошибка: {str(e)}"
        }, status=500)
