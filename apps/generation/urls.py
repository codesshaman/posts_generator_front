from .step_1 import process_group_selection
from .step_2 import get_group_topics
from .step_3 import mock_generated_posts
from .views import autogeneration
from django.urls import path



urlpatterns = [
    path('autogeneration', autogeneration, name='autogeneration'),
    path('process-group-selection/', process_group_selection, name='process_group_selection'),
    path('get-group-topics/', get_group_topics, name='get_group_topics'),
    path('generate-content-plan/', mock_generated_posts, name='generate_content_plan'),
]