from rest_framework import serializers

from .models import Games


class LeaguesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = '__all__'
