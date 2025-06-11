from .views import content_plan
from django.urls import path



urlpatterns = [
    path('contentplan', content_plan, name='content_plan'),
]