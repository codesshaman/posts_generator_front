from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('', include('apps.login.urls')),       # Страница входа
    path('', include('apps.basetmp.urls')),     # Базовый шаблон
    path('', include('apps.mainpage.urls')),    # Заглавная страница
    path('', include('apps.articles.urls')),    # Страница статей
    path('', include('apps.settings.urls')),    # Страница настроек
    path('', include('apps.vkoauth.urls')),     # Аутентификация VK
    path('', include('apps.posting.urls')),     # Страница "Мои посты"
    path('', include('apps.subscribe.urls')),   # Страница подписки
    path('', include('apps.generation.urls')),  # Страница автогенерации
    path('', include('apps.contentplan.urls')),  # Страница контент-плана
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
