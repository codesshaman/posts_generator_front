from django.urls import path
from .views import *


urlpatterns = [
    path('create_post', create_post, name='create_post'),
]
