from django.http import HttpResponseRedirect


def filter_platform(request):
    # Получаем параметр platform из GET-запроса
    platform = request.GET.get('platform', 'all')  # Дефолт: 'all', если параметр отсутствует
    print(f"Selected platform: {platform}")  # Для простоты, также в stdout
    # Редирект на ту же страницу (без параметра или с ним, если нужно сохранить)
    # Пример: редирект на /posts (замените 'posts' на ваш маршрут)
    return HttpResponseRedirect(f'/scheduler?platform={platform}')  # Или redirect('posts') для именованного URL

def filter_date(request):
    date = request.GET.get('date', 'all')
    print(f"Selected date: {date}")
    # Перенаправляем на scheduler, сохраняя параметр date
    return HttpResponseRedirect(f'/scheduler?date={date}')
