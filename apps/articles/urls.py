from django.urls import path
from .views import *

urlpatterns = [
    path('articles', articles, name='articles'),
    path('load-more-articles/', load_more_articles, name='load_more_articles'),
]