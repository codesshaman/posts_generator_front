import requests
from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect


def home(request):
    return render(request, "vk_auth/home.html")


@login_required
def user_data_api(request):
    """Возвращает JSON-ответ с данными авторизованного пользователя"""
    user = request.user
    social = user.social_auth.filter(provider='vk-oauth2').first()

    user_data = {
        'username': user.username,
        'email': user.email,
        'vk_id': social.uid if social else None,
        'first_name': user.first_name,
        'last_name': user.last_name,
    }

    return JsonResponse(user_data)


def logout_view(request):
    """Выход из системы"""
    logout(request)
    return render(request, 'vk_auth/home.html')

