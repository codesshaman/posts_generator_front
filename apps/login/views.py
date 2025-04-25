from django.shortcuts import render


def login(request):
    return render(request, 'login/login.html', {
        'title': 'Base Page'
    })

def reset_password(request):
    return render(request, 'login/reset_password.html', {
        'title': 'Base Page'
    })