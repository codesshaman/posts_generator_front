import random
import time
from django.http import JsonResponse

def image_gen_view(request):
    # Массив ссылок на изображения-заглушки
    dummy_images = [
        "https://picsum.photos/id/237/512/512",
        "https://picsum.photos/id/1025/512/512",
        "https://picsum.photos/id/1003/640/480",
        "https://picsum.photos/id/1018/640/360",
        "https://picsum.photos/id/1024/512/512",
    ]

    # Рандомная задержка генерации (в секундах)
    generation_time = random.uniform(2, 5)
    time.sleep(generation_time)

    return JsonResponse({
        "ready": True,
        "image_url": random.choice(dummy_images)
    })
