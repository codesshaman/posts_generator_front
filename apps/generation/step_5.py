from django.views.decorators.csrf import csrf_exempt
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


@csrf_exempt
def get_content_plan(request):
    # Заглушка с данными контент-плана
    content_plan = [
        {
            "id": 1,
            "title": "Введение в маркетинг",
            "description": "Рассказываем основы маркетинга для начинающих.",
            "platform": "instagram",
            "publishDate": "25.07.2025",
            "hashtags": "#маркетинг #основымаркетинга #бизнес #продвижение #smm"
        },
        {
            "id": 2,
            "title": "Тренды SMM 2025",
            "description": "Какие тренды в социальных сетях будут актуальны в 2025 году.",
            "platform": "linkedin",
            "publishDate": "26.07.2025",
            "hashtags": "#smm #тренды2025 #соцсети #digital #маркетинг"
        },
        {
            "id": 3,
            "title": "Эффективная реклама",
            "description": "Как создать рекламу, которая привлечёт клиентов.",
            "platform": "facebook",
            "publishDate": "27.07.2025",
            "hashtags": "#seo #продвижение #маркетинг"
        },
        {
            "id": 4,
            "title": "Короткий твит о SEO",
            "description": "SEO остаётся ключевым для продвижения!",
            "platform": "twitter",
            "publishDate": "28.07.2025",
            "hashtags": "#seo #продвижение #маркетинг"
        }
    ]

    return JsonResponse({"status": "ok", "contentPlan": content_plan})


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
