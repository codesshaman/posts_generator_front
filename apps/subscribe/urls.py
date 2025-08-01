from .credit_cards import delete_card, edit_payment_method
from .manage_subscription import manage_subscription
from .add_payment_method import add_payment_method
from .change_tariff import update_tariff
from .add_coins import add_coins
from django.urls import path
from .views import *

urlpatterns = [
    path('add-coins/', add_coins, name='add_coins'),
    path('subscription', subscription, name='subscription'),
    path('card/delete/<int:card_id>/', delete_card, name='delete_card'),
    path('add-payment-method/', add_payment_method, name='add_payment_method'),
    path('edit-payment-method/', edit_payment_method, name='edit_payment_method'),
    path('manage-subscription/', manage_subscription, name='manage_subscription'),
    path('update-tariff/', update_tariff, name='update_tariff'),
]
