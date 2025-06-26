from django.http import JsonResponse
from datetime import datetime


def get_postanalysis_text(lang):
    if lang == "ru":
        return "На основе анализа группы мы определили \
                основные темы, которые могут быть интересны \
                вашей аудитории. Вы можете отредактировать \
                предложенные темы или добавить свои."
    else:
        return "Based on the group analysis, we have identified \
                the main topics that may be of interest to you. \
                You can edit the suggested topics or add your own."

def mock_generated_posts(request):
    posts = [
        {
            "id": 8,
            "title": "10 трендов в SMM в 2025 году",
            "content": "Социальные сети продолжают развиваться, и вот ключевые тенденции, которые стоит учитывать...",
            "hashtags": "#smm #тренды #маркетинг",
            "image": "https://via.placeholder.com/600x400?text=Post_1",
            "platform": "instagram",
            "publishDate": datetime.now().strftime('%d.%m.%Y')
        },
        {
            "id": 9,
            "title": "Как продвигать бренд через Reels",
            "content": "Reels стал мощным инструментом маркетинга. Вот как его использовать правильно...",
            "hashtags": "#reels #instagram #продвижение",
            "image": "https://via.placeholder.com/600x400?text=Post_2",
            "platform": "facebook",
            "publishDate": datetime.now().strftime('%d.%m.%Y')
        }
    ]

    return JsonResponse(posts, safe=False)
