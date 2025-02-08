from django.urls import path
from .views import vk_login_view

urlpatterns = [
    path('', vk_login_view, name='vk_login'),         # Отображение HTML-страницы
    # path('login-url/', vk_login_url, name='vk_login_url'),  # API для авторизации
    # path('callback/', vk_callback, name='vk_callback'),    # API для обработки кода
]
