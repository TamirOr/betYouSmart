from rest_framework import serializers

from .models import League


class LeaguesSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'
