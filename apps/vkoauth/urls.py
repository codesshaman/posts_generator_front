from .views import user_data_api, logout_view, vk_auth
from django.urls import path
from . import views

urlpatterns = [
    path('user-data/', views.user_data_api, name='user_data_api'),
    path('auth/', views.auth, name='auth'),  # Если нужен, иначе можно убрать
    path('logout/', views.logout_view, name='logout_view'),
]