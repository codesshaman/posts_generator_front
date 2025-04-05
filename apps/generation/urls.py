from django.urls import path
from .views import autogeneration


urlpatterns = [
    path('autogeneration', autogeneration, name='autogeneration')
]