from django.urls import path, include
from .views import home, user_data_api, logout_view

urlpatterns = [
    path('', home, name='home'),
    path('user-data/', user_data_api, name='user_data_api'),  # API-метод для получения данных
    path('logout/', logout_view, name='logout'),
]
