from .step_1 import process_group_selection
from .step_2 import get_group_topics
from .views import autogeneration
from django.urls import path



urlpatterns = [
    path('autogeneration', autogeneration, name='autogeneration'),
    path('process-group-selection/', process_group_selection, name='process_group_selection'),
    path('get-group-topics/', get_group_topics, name='get_group_topics'),
]