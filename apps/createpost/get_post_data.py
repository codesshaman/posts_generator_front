from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Для простоты, но в продакшене используйте csrf_protect и токен
def save_post(request):
    if request.method == 'POST':
        try:
            post_data = json.loads(request.body)
            # Выводим все данные в консоль как заглушку
            print("Полученные данные поста:")
            print(f"Заголовок: {post_data.get('title')}")
            print(f"Содержание: {post_data.get('content')}")
            print(f"Изображение (src): {post_data.get('image')}")
            print(f"Хэштеги: {post_data.get('hashtags')}")
            print("Группы:")
            for group in post_data.get('groups', []):
                print(f"  - ID: {group['id']}, Платформа: {group['platform']}, Название: {group['title']}")
            print(f"Статус: {post_data.get('status')}")
            print(f"Дата публикации: {post_data.get('publishDate')}")
            print(f"Дата создания: {post_data.get('createdAt')}")
            print(f"Разрешить комментарии: {post_data.get('allowComments')}")

            # Возвращаем успешный ответ
            return JsonResponse({'status': 'success', 'message': 'Данные сохранены и выведены в консоль'})
        except Exception as e:
            print(f"Ошибка: {str(e)}")
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Неверный метод'}, status=405)
