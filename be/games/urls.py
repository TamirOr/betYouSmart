from django.urls import path

from .views import GamesViewSet, GameViewSet

urlpatterns = [
    path('games/<str:sport_type>/<str:league>/<str:date_to>', GamesViewSet.as_view({
        'get': 'list',
    })),
    path('game/<str:sport_type>/<str:game_id>', GameViewSet.as_view({
        'get': 'list',
    })),
]
