from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
from django.http import JsonResponse
import json


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

@csrf_exempt  # Для отладки. В боевом режиме лучше CSRF защищать
def generate_posts_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            items = data.get('items', [])

            print("==== ПОЛУЧЕННЫЕ ДАННЫЕ ====")
            for item in items:
                print(f"ID: {item.get('id')}")
                print(f"Заголовок: {item.get('title')}")
                print(f"Описание: {item.get('description')}")
                print(f"Платформа: {item.get('platform')}")
                print(f"Дата публикации: {item.get('publishDate')}")
                print(f"Генерировать изображение: {item.get('generateImages')}")
                print("-----")

            return JsonResponse({'status': 'ok', 'message': 'Данные получены'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Только POST'}, status=405)


@require_GET
def get_content_plan(request):
    # Заглушка с тестовыми данными
    content_plan = [
        {
            'id': 1,
            'title': 'Новинки осеннего сезона',
            'description': 'Представляем новую коллекцию осенней одежды',
            'platform': 'instagram',
            'publish_date': (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'),
            'image': 'https://via.placeholder.com/600x400?text=Новинки+осеннего+сезона'
        },
        {
            'id': 2,
            'title': 'Советы по продуктивности',
            'description': '5 способов повысить эффективность работы',
            'platform': 'linkedin',
            'publish_date': (datetime.now() + timedelta(days=2)).strftime('%Y-%m-%d %H:%M:%S'),
            'image': 'https://via.placeholder.com/600x400?text=Советы+по+продуктивности'
        },
        {
            'id': 3,
            'title': 'Быстрый анонс',
            'description': 'Скоро большой релиз!',
            'platform': 'twitter',
            'publish_date': (datetime.now() + timedelta(days=3)).strftime('%Y-%m-%d %H:%M:%S'),
            'image': 'https://via.placeholder.com/600x400?text=Быстрый+анонс'
        },
        {
            'id': 4,
            'title': 'История успеха',
            'description': 'Как мы достигли новых высот',
            'platform': 'facebook',
            'publish_date': (datetime.now() + timedelta(days=4)).strftime('%Y-%m-%d %H:%M:%S'),
            'image': 'https://via.placeholder.com/600x400?text=История+успеха'
        }
    ]

    return JsonResponse({'posts': content_plan})

# views.py
from django.http import JsonResponse

def save_post(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        platform = request.POST.get('platform')
        content = request.POST.get('content')
        hashtags = request.POST.get('hashtags')
        schedule_date = request.POST.get('schedule_date')
        schedule_time = request.POST.get('schedule_time')
        image = request.FILES.get('image')

        print("===== Полученные данные =====")
        print("Название:", title)
        print("Платформа:", platform)
        print("Контент:", content)
        print("Хэштеги:", hashtags)
        print("Дата публикации:", schedule_date)
        print("Время публикации:", schedule_time)
        print("Изображение:", image.name if image else "Нет изображения")
        print("=============================")

        return JsonResponse({'status': 'success'})

    return JsonResponse({'status': 'error', 'message': 'Invalid method'}, status=400)
