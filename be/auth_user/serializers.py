from django.contrib.auth.models import User
from django.db import transaction, models
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(user.password)
        user.save()
        Token.objects.create(user=user)
        return user


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']

        return attrs

    def save(self, request):
        try:
            print('-----in token------')
            print(request.data.get('refresh'))

            RefreshToken(request.data.get('refresh')).blacklist()
        except TokenError:
            print(str(TokenError))
            self.fail('bad_token')
