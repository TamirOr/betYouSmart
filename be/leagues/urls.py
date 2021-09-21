from django.urls import path

from .views import LeaguesViewSet

urlpatterns = [
    path('leagues/<str:sport_type>', LeaguesViewSet.as_view({
        'get': 'list',
    })),
]
