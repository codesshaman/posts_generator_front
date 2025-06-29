from .step_1 import process_group_selection, check_analysis_status
from .step_2 import get_group_topics
from .step_3 import receive_content_plan, check_generate_status
from .step_4 import posts_generation, check_posts_status
from .views import autogeneration
from django.urls import path



urlpatterns = [
    path('autogeneration', autogeneration, name='autogeneration'),
    path('process-group-selection/', process_group_selection, name='process_group_selection'),
    path('check-analysis-status/', check_analysis_status, name='check_analysis_status'),
    path('check-generate-status/', check_generate_status, name='check_generate_status'),
    path('check-posts-status/', check_posts_status, name='check_posts_status'),
    path('get-group-topics/', get_group_topics, name='get_group_topics'),
    path('receive-content-plan/', receive_content_plan, name='receive_content_plan'),
    path('generate-content-plan/', posts_generation, name='generate_content_plan'),
]
