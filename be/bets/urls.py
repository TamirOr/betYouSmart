from django.urls import path

from .views import BetViewSet, BetsViewSet

urlpatterns = [
    path('bets', BetsViewSet.as_view({
        'get': 'list',
    })),
    path('bet', BetViewSet.as_view({
        'post': 'create',
    })),
    path('bet/<str:bet_id>', BetViewSet.as_view({
        'put': 'update',
    })),
]
