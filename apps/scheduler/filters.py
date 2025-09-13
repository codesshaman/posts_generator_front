from django.http import HttpResponseRedirect


def filter_platform(request):
    # Получаем параметр platform из GET-запроса
    print("test")
    platform = request.GET.get('platform', 'all')  # Дефолт: 'all', если параметр отсутствует
    print("test2")
    print(f"Selected platform: {platform}")  # Для простоты, также в stdout

    # Редирект на ту же страницу (без параметра или с ним, если нужно сохранить)
    # Пример: редирект на /posts (замените 'posts' на ваш маршрут)
    return HttpResponseRedirect('/scheduler')  # Или redirect('posts') для именованного URL
