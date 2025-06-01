from .update_password import update_password, change_password
from .update_personal_info import update_personal_info
from .telegram_subscribe import telegram_subscribe
from .save_notifications import save_notifications
from .groups_data import edit_group, delete_group
from .add_group import add_group
from django.urls import path
from .views import *


urlpatterns = [
    path('settings', settings, name='settings'),
    path('add_group/', add_group, name='add_group'),
    path('settings/update/', update_settings, name='update_settings'),
    path('settings/update-password/', update_password, name='update_password'),
    path('save-notifications/', save_notifications, name='save_notifications'),
    path('telegram/subscribe/', telegram_subscribe, name='telegram_subscribe'),
    path("settings/personal-info/update/", update_personal_info, name="update_personal_info"),
    path('edit_group/<int:group_id>/', edit_group, name='edit_group'),
    path('delete_group/<int:group_id>/', delete_group, name='delete_group'),
    path('settings/change-password/', change_password, name='log_password'),
]
