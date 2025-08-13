import random
from django.http import JsonResponse

def image_generation_status(request):
    """Возвращает true в 15% случаев."""
    status = random.random() < 0.15  # True ~15%
    return JsonResponse({"ready": status})
