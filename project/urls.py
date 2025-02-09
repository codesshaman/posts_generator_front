from django.urls import path, include
from .views import index


urlpatterns = [
    path('', index, name='home'),  # Главная страница
    path('vkauth/', include('apps.vk_auth.urls')),
]
