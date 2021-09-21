from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.models import User
from django.shortcuts import render
from django.utils.decorators import method_decorator
from rest_framework import viewsets, generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer, LogoutSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        print("post a new token by user id")
        response = super(GetAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id=token.user_id)
        user_serializer = UserSerializer(user, many=False)
        return Response({"user": user_serializer.data, "token": token.key})


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        print('-------------refresh token------------')
        print(request.data.get('refresh'))
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(request)

        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request):
        try:
            print("delete new user")
            user = User.objects.get(username=request.data['username'])
            requester_token = request.headers['Authorization'][6:]
            requester_user = Token.objects.get(key=requester_token).user
            requester_user = User.objects.get(username=requester_user)
            if not requester_user.is_staff:
                print("warning: user is not admin. action not allowed")
                raise ValueError('User is not admin')
            token = Token.objects.get(user=user)
            token.delete()
            user.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)

        except User.DoesNotExist:
            print("User does not exist")
            return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("error: " + str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
