from django.urls import path
from .views import login, reset_password, auth_action


urlpatterns = [
    path('', login, name='login'),
    path('auth', auth_action, name='auth_action'),
    path('reset-password', reset_password, name='reset-password')
]