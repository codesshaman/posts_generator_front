def dark_mode(request):
    # Проверяем значение dark_mode в cookies
    dark_mode = request.COOKIES.get('dark_mode', 'false').lower() == 'true'
    return {'set_dark_mode': dark_mode}
