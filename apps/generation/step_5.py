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