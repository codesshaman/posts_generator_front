from django.urls import path
from .views import *

urlpatterns = [
    path('subscription', subscription, name='subscription'),
]
