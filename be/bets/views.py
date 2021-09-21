import datetime
import json
from django.http import QueryDict
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Bet
from .scheduler import update_scheduler
from .serializers import BetSerializer, BetUserSerializer
from .utils import myBetsBodyGenerator, SearchBodyGenerator, BetStatus


# searching / all my bets
class BetsViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):  # GET /bets/?param={query_param})
        objects = ''
        key = list(request.GET.keys())[0]
        value = list(request.GET.values())[0]
        print("get bets by key: " + key + " values: " + value)
        if request.user.is_authenticated:
            userId = request.user.id
        else:
            userId = request.user
        if key == 'all_bets':
            print("get user: " + request.user + " bets")
            return Response(myBetsBodyGenerator(userId), status=status.HTTP_200_OK)

        elif key == 'contract_address':
            objects = Bet.objects.filter(contract_address=value, active=True)
        elif key == 'date':
            objects = Bet.objects.filter(date=value, active=True)
        elif key == 'team':
            objects = (Bet.objects.filter(team_a=value) | Bet.objects.filter(team_b=value)) & Bet.objects.filter(
                active=True)
        elif key == 'finish':
            print("get all bets on status 'game_end'")
            objects = Bet.objects.filter(status=BetStatus.GAME_END.value).all()
            for i in range(len(objects)):
                # serializer for objects
                objects[i].status = BetStatus.CONTRACT_UPDATE.value
                objects[i].save()

        else:  # bad request
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(SearchBodyGenerator(objects), status=status.HTTP_200_OK)


class BetViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def create(self, request):  # POST /bet
        print("user" + request.user + " create new bet")
        jsonParse = ''
        userId = ''
        if request.user.is_authenticated:
            userId = request.user.id
        else:
            userId = request.user

        for key in (QueryDict.dict(request.POST).keys()):
            jsonParse = json.loads(key)
        print("bet details " + jsonParse)
        date_string = datetime.datetime.utcfromtimestamp(int(jsonParse['time_stamp']) / 1000).strftime("%Y-%m-%d")
        update_scheduler(uuid=request.data['uuid'], time_stamp=request.data['time_stamp'],
                         game_id=request.data['game_id'], sport_type=request.data['sport_type'])
        serializer = BetSerializer(data=jsonParse)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['date'] = date_string
        serializer.save()

        json_user_to_bet = {"bet_uuid": jsonParse['uuid'], "user_uuid": userId}

        bet_to_user_serializer = BetUserSerializer(data=json_user_to_bet)
        bet_to_user_serializer.is_valid(raise_exception=True)
        bet_to_user_serializer.save()

        print("bet created")
        return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

    # update bet info
    def update(self, request, bet_id=None):  # PUT /bet/{bet_id}
        print("update bet: " + bet_id)
        bet = Bet.objects.get(uuid=bet_id)
        current_user = request.user
        serializer = BetSerializer(instance=bet, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(request.data, status=status.HTTP_202_ACCEPTED)
