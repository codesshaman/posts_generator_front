from .credit_cards import delete_card
from django.urls import path
from .views import *

urlpatterns = [
    path('subscription', subscription, name='subscription'),
    path('card/delete/<int:card_id>/', delete_card, name='delete_card'),
]
