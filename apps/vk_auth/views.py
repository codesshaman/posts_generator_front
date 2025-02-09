from django.shortcuts import render

def vk_login_view(request):
    return render(request, 'vkauth.html', {"url": "http://127.0.0.1:1024/vkauth/"})
