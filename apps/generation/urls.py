from .step_1 import process_group_selection, check_analysis_status
from .step_2 import get_group_topics, check_reset_view, notify_button_click
from .step_3 import receive_content_plan, check_generate_status, view_content_plan
from .step_4 import posts_generation, check_posts_status, receive_content_plan
from .step_5 import generate_posts_view, get_content_plan, save_post
from .views import autogeneration
from django.urls import path



urlpatterns = [
    path('autogeneration', autogeneration, name='autogeneration'),
    path('process-group-selection/', process_group_selection, name='process_group_selection'),
    path('check-analysis-status/', check_analysis_status, name='check_analysis_status'),
    path('check-generate-status/', check_generate_status, name='check_generate_status'),
    path('receive-content-plan/', receive_content_plan, name='receive_content_plan'),
    path('check-posts-status/', check_posts_status, name='check_posts_status'),
    path('get-group-topics/', get_group_topics, name='get_group_topics'),
    path('generate-content-plan/', posts_generation, name='generate_content_plan'),
    path('view-content-plan/', view_content_plan, name='view_content_plan'),
    path('notify-button-click/', notify_button_click, name='notify_button_click'),
    path('get-content-plan/', get_content_plan, name='get_content_plan'),
    path('generate-posts/', generate_posts_view, name='generate_posts'),
    path('check-reset/', check_reset_view, name='check_reset'),
    path('save-post/', save_post, name='save_post'),
]
