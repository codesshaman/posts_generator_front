from .add_payment_method import add_payment_method
from .credit_cards import delete_card
from django.urls import path
from .views import *

urlpatterns = [
    path('subscription', subscription, name='subscription'),
    path('card/delete/<int:card_id>/', delete_card, name='delete_card'),
    path('add-payment-method/', add_payment_method, name='add_payment_method'),
]
