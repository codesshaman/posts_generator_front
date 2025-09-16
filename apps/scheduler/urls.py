from django.urls import path
from .filters import *
from .views import *


urlpatterns = [
    path('scheduler', scheduler, name='scheduler'),
    path('filter-date/', filter_date, name='date_filter'),
    path('filter-platform/', filter_platform, name='platform'),
]
