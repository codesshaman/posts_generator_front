from django.shortcuts import render


def index(request):
    """Отображение главной страницы."""
    return render(request, 'index.html')