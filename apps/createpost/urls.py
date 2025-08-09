from .generate_content import generate_content_api
from django.urls import path
from .timeout import *
from .promts import *
from .views import *


urlpatterns = [
    path('create_post/', create_post, name='create_post'),
    path('get_next_id/', generate_unique_id, name='generate_id'),
    path('generate_one_post/', generate_content_api, name='generate_content_api'),
    path('generate_prompt/', generate_prompt, name='generate_prompt'),
    path('check_completion/', check_completion, name='check_completion'),
    path('get_initial_tokens/', get_initial_tokens, name='get_initial_tokens'),
]
