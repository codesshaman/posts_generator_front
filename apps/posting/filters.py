from django.http import HttpResponseRedirect
from urllib.parse import urlencode

def filter_date(request):
    date = request.GET.get('date', 'all')
    platform = request.GET.get('platform', 'all')
    status = request.GET.get('status', 'all')
    print(f"Selected date: {date}")
    print(f"Selected platform: {platform}")
    print(f"Selected status: {status}")
    # Перенаправляем на posts, сохраняя все параметры
    query_params = urlencode({'date': date, 'platform': platform, 'status': status})
    return HttpResponseRedirect(f'/posts?{query_params}')

def filter_platform(request):
    platform = request.GET.get('platform', 'all')
    date = request.GET.get('date', 'all')
    status = request.GET.get('status', 'all')
    print(f"Selected date: {date}")
    print(f"Selected platform: {platform}")
    print(f"Selected status: {status}")
    # Перенаправляем на posts, сохраняя все параметры
    query_params = urlencode({'date': date, 'platform': platform, 'status': status})
    return HttpResponseRedirect(f'/posts?{query_params}')

def filter_status(request):
    status = request.GET.get('status', 'all')
    date = request.GET.get('date', 'all')
    platform = request.GET.get('platform', 'all')
    print(f"Selected date: {date}")
    print(f"Selected platform: {platform}")
    print(f"Selected status: {status}")
    # Перенаправляем на posts, сохраняя все параметры
    query_params = urlencode({'date': date, 'platform': platform, 'status': status})
    return HttpResponseRedirect(f'/posts?{query_params}')
