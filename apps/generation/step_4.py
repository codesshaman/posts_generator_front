from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime
import random


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

def posts_generation(request):
    posts = [
        {
            "id": 8,
            "title": "10 трендов в SMM в 2025 году",
            "description": "Социальные сети продолжают развиваться, и вот ключевые тенденции, которые стоит учитывать...",
            "hashtags": "#smm #тренды #маркетинг",
            "image": "https://via.placeholder.com/600x400?text=Post_1",
            "platform": "instagram",
            "publishDate": datetime.now().strftime('%d.%m.%Y')
        },
        {
            "id": 9,
            "title": "Как продвигать бренд через Reels",
            "description": "Reels стал мощным инструментом маркетинга. Вот как его использовать правильно...",
            "hashtags": "#reels #instagram #продвижение",
            "image": "https://via.placeholder.com/600x400?text=Post_2",
            "platform": "facebook",
            "publishDate": datetime.now().strftime('%d.%m.%Y')
        },
        {
            "id": 10,
            "title": "Ну кто так ест?",
            "description": "Неправильно ты, Дядя Фёдор, бутерброд ешь. Надо колбасой на язык класть...",
            "hashtags": "#reels #instagram #продвижение",
            "image": "https://via.placeholder.com/600x400?text=Post_2",
            "platform": "facebook",
            "publishDate": datetime.now().strftime('%d.%m.%Y')
        }
    ]

    return JsonResponse(posts, safe=False)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def check_posts_status(request):
    if not request.session.session_key:
        request.session.create()

    if request.method == 'POST':
        # Перезапуск генерации постов
        request.session['posts_started_at'] = timezone.now().timestamp()
        request.session['posts_delay'] = random.randint(5, 15)
        request.session.modified = True
        return JsonResponse({'status': False})

    # Проверка статуса
    if 'posts_started_at' not in request.session:
        return JsonResponse({'status': False})

    start_time = request.session['posts_started_at']
    delay = request.session['posts_delay']
    now = timezone.now().timestamp()
    elapsed = now - start_time

    if elapsed >= delay:
        request.session.pop('posts_started_at', None)
        request.session.pop('posts_delay', None)
        request.session.modified = True
        return JsonResponse({'status': True})

    return JsonResponse({'status': False})
