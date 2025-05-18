from django.urls import path
from .views import *

urlpatterns = [
    path('settings', settings, name='settings'),
    path('settings/update/', update_settings, name='update_settings'),
    path('settings/update-password/', update_password, name='update_password'),
    path('save-notifications/', save_notifications, name='save_notifications'),
    path('telegram/subscribe/', telegram_subscribe, name='telegram_subscribe'),
    path("settings/personal-info/update/", update_personal_info, name="update_personal_info"),
    path('edit_group/<int:group_id>/', edit_group, name='edit_group'),
    path('delete_group/<int:group_id>/', delete_group, name='delete_group'),
]
