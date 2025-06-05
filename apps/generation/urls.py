from .step_1 import process_group_selection
from django.urls import path
from .views import autogeneration


urlpatterns = [
    path('autogeneration', autogeneration, name='autogeneration'),
    path('process-group-selection/', process_group_selection, name='process_group_selection'),
]