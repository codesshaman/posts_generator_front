from .generate_content import generate_content_api
from django.urls import path
from .views import *


urlpatterns = [
    path('create_post', create_post, name='create_post'),
    path('get_next_id/', generate_unique_id, name='generate_id'),
    path('generate_one_post/', generate_content_api, name='generate_content_api')
]
