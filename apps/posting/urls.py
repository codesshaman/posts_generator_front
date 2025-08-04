from django.urls import path
from .views_posts import *
from .views_scheduler import *


urlpatterns = [
    path('posts', posts, name='posts'),
    path('load-more-posts/', load_more_posts, name=''),
    path('delete-post/<int:post_id>/', delete_post, name=''),
    path('edit-post/<int:post_id>/', edit_post, name=''),
    path('scheduler', scheduler, name='scheduler'),
]
