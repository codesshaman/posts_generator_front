from django.urls import path
from .views import *


urlpatterns = [
    path('scheduler', scheduler, name='scheduler'),
]
