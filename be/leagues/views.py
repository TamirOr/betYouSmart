from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from games.utils import SportType
from .leagues_dict import SOCCER_LEAGUE_IDS, BASKETBALL_LEAGUE_IDS


class LeaguesViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request, sport_type=None):  # /api/leagues GET
        print(f'get list of league: ')
        if sport_type == SportType.FOOTBALL.value:
            print("football: ")
            return Response(SOCCER_LEAGUE_IDS, status=status.HTTP_200_OK)

        elif sport_type == SportType.BASKETBALL.value:
            print("basketball: ")
            return Response(BASKETBALL_LEAGUE_IDS, status=status.HTTP_200_OK)
        else:
            return Response(request.data, status=status.HTTP_400_BAD_REQUEST)
