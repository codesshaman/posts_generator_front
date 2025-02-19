from django.urls import path, include
from .views import index


urlpatterns = [
    path('', include('apps.vk_auth.urls')),
    path('social-auth/', include('social_django.urls', namespace='social')),  # Авторизация через соцсети
]
