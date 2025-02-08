from django.shortcuts import render

def vk_login_view(request):
    return render(request, 'vkauth.html')
