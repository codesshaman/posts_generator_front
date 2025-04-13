from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('', include('apps.basetmp.urls')),     # Базовый шаблон
    path('', include('apps.mainpage.urls')),    # Заглавная страница
    path('', include('apps.articles.urls')),    # Страница статей
    path('', include('apps.vkoauth.urls')),     # Аутентификация VK
    path('', include('apps.posting.urls')),     # Страница "Мои посты"
    path('', include('apps.generation.urls')),  # Страница автогенерации
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
