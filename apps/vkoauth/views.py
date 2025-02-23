from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from dotenv import load_dotenv # Для дебага
from .query import Query
import requests  # Для работы с внешними API
import json
import os

# Загружаем .env файл
load_dotenv()

# Устанавливаем debug mode
debug = os.getenv('DEBUG')

def auth(request):
    """Отображает страницу авторизации с данными пользователя"""
    if debug:  # Предполагается, что debug определен где-то в коде
        print("Отображаем страницу auth")
    
    access_token = request.GET.get('access_token')
    user_data = None
    error_message = None
    
    if access_token:
        try:
            vk_api_url = "https://api.vk.com/method/users.get"
            params = {
                'access_token': access_token,
                'v': '5.131',
                'fields': 'photo_200,first_name,last_name'
            }
            
            response = requests.get(vk_api_url, params=params)
            if response.ok:
                user_data = response.json()
                user_info = user_data['response'][0]
                user_data = {
                    'username': f"vk_{user_info['id']}",  # Формируем псевдо-username
                    'photo_200': user_info['photo_200'],
                    'vk_id': user_info['id'],
                    'first_name': user_info.get('first_name', ''),
                    'last_name': user_info.get('last_name', ''),
                    'email': user_info.get('email', ''),  # Email доступен только если разрешён приложением
                }

                backend_query = Query(user_data, access_token)
                backend_query.query_to_backend()
            else:
                error_message = f"Ошибка VK API: {response.status_code}"
        except requests.RequestException as e:
            error_message = f"Ошибка при получении данных: {str(e)}"
    else:
        error_message = "Токен авторизации отсутствует"

    context = {
        'title': 'Авторизация VK',
        'access_token': access_token,
        'user_data': json.dumps(user_data, ensure_ascii=False) if user_data else None,
        'error_message': error_message
    }
    
    return render(request, "vk_auth.html", context)

def logout_view(request):
    # Здесь должна быть логика выхода, например:
    return render(request, "logout.html")

def user_data_api(request):
    """
    Возвращает JSON-ответ с данными пользователя, полученными из VK API.
    Предполагается, что токен передаётся через GET-параметр от фронтенда.
    """

    print("Заходим в метод user_data_api")
    # Получаем токен из запроса (предоставляется клиентским JS)
    access_token = request.GET.get('access_token')
    if debug:
        print("Получен токен:", access_token)
    if not access_token:
        return JsonResponse({'error': 'No access token provided'}, status=400)

    # Запрос к VK API для получения данных пользователя
    vk_api_url = "https://api.vk.com/method/users.get"
    params = {
        'access_token': access_token,
        'v': '5.131',  # Версия API
        'fields': 'first_name,last_name,email',  # Поля, которые нужны
    }

    try:
        if debug:
            print("Отправляем запрос к VK API")
        response = requests.get(vk_api_url, params=params)
        if debug:
            print("Ответ от VK:", response.text)
        response.raise_for_status()  # Проверка на ошибки HTTP
        vk_data = response.json()

        if 'response' not in vk_data or not vk_data['response']:
            return JsonResponse({'error': 'Invalid VK response'}, status=400)

        user_info = vk_data['response'][0]
        user_data = {
            'username': f"vk_{user_info['id']}",  # Формируем псевдо-username
            'vk_id': user_info['id'],
            'first_name': user_info.get('first_name', ''),
            'last_name': user_info.get('last_name', ''),
            'email': user_info.get('email', ''),  # Email доступен только если разрешён приложением
        }

        if debug:
            print("Полученные данные пользователя:", user_data)

        return JsonResponse(user_data)

    except requests.RequestException as e:
        if debug:
            print('Что-то пошло не так')

        return JsonResponse({'error': f'Failed to fetch VK data: {str(e)}'}, status=500)

def logout_view(request):
    """Простая заглушка для выхода (без реальной аутентификации)"""
    if debug:
        print("Выходим из аккаунта")
    return render(request, 'vk_logauth.html')

def vk_auth(request):
    """Отображает страницу авторизации через VK с динамической ссылкой."""
    vk_auth_url = (
        "https://oauth.vk.com/authorize?"
        "client_id={client_id}&"
        "display=page&"
        "redirect_uri={redirect_uri}&"
        "scope=email&"
        "response_type=token&"
        "v=5.131"
    ).format()
    print(vk_auth_url)
    return render(request, 'index.html', {'vk_auth_url': vk_auth_url})
