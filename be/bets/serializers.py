from rest_framework import serializers

from .models import Bet, UserToBet


class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields = '__all__'


class BetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToBet
        fields = '__all__'
