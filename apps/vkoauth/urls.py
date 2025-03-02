from .views import user_data_api, logout_view, auth, authentications
from django.urls import path
from . import views

urlpatterns = [
    path('authentications/', authentications, name='authentications'),
    path('user-data/', user_data_api, name='user_data_api'),
    path('auth/', auth, name='auth'),
    path('logout/', logout_view, name='logout_view'),
]