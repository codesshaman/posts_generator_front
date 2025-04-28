from django.urls import path
from .views_posts import *
from .views_settings import *
from .views_scheduler import *
from .views_create_post import *
from .views_subscription import *

urlpatterns = [
    path('posts', posts, name='posts'),
    path('load-more-posts/', load_more_posts, name=''),
    path('delete-post/<int:post_id>/', delete_post, name=''),
    path('edit-post/<int:post_id>/', edit_post, name=''),
    path('scheduler', scheduler, name='scheduler'),
    path('create_post', create_post, name='create_post'),
    path('subscription', subscription, name='subscription'),
    path('settings', settings, name='settings'),
    path('settings/update/', update_settings, name='update_settings'),
    path('settings/update-password/', update_password, name='update_password'),
]
