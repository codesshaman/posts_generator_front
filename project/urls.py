from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('vkauth/', include('apps.vk_auth.urls')),
]
