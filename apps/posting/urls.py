from django.urls import path
from .views_posts import *
from .views_settings import *
from .views_scheduler import *
from .views_create_post import *
from .views_autogeneration import *


urlpatterns = [
    path('posts', posts, name='posts'),
    path('load-more-posts/', load_more_posts, name=''),
    path('scheduler', scheduler, name='scheduler'),
    path('posting_settings', posting_settings, name='posting_settings'),
    path('autogeneration', autogeneration, name='autogeneration'),
    path('create_post', create_post, name='create_post'),
]
