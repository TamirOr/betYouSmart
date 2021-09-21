from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, permissions

from .views import UserViewSet, LogoutAPIView

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('logout/', LogoutAPIView.as_view(), name='logout')
]
