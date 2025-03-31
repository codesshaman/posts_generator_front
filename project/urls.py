from django.urls import path, include

urlpatterns = [
    path('', include('apps.basetmp.urls')),     # Базовый шаблон
    path('', include('apps.mainpage.urls')),    # Заглавная страница
    path('', include('apps.articles.urls')),    # Страница статей
    path('', include('apps.vkoauth.urls')),     # Аутентификация VK
    path('', include('apps.posting.urls')),     # Страница "Мои посты"
]
