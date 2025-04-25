from django.urls import path
from .views import login, reset_password


urlpatterns = [
    path('', login, name='login'),
    path('reset-password', reset_password, name='reset-password')
]