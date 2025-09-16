from django.urls import path
from .views_posts import *
from .filters import *


urlpatterns = [
    path('posts', posts, name='posts'),
    path('load-more-posts/', load_more_posts, name=''),
    path('delete-post/<int:post_id>/', delete_post, name=''),
    path('filter-date/', filter_date, name='date_filter'),
    path('filter-platform/', filter_platform, name='platform_filter'),
    path('filter-status/', filter_status, name='status_filter'),
    path('edit-post/<int:post_id>/', edit_post, name='')
]
