import datetime
import json
import time
from rest_framework import viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .utils import SportType, getGames, getGame
from admin.utils import legalResponse


class GamesViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request, sport_type, league=None, date_to=None):  # /games/{sport_type}/{league}/{date_to} GET
        print(f'get games by sport_type: {sport_type} league {league} until {date_to}')
        date_to_object = datetime.datetime.strptime(date_to, "%Y-%m-%d")
        if date_to_object < datetime.datetime.now():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        final_games = {}
        response = []
        response = getGames(sport_type, league, date_to_object)
        if not legalResponse(response):
            print(f'error get games- {response.text}')
            return Response(status=status.HTTP_404_NOT_FOUND)

        final_games[sport_type] = json.loads(response.text).get('response')
        final_games = final_games[sport_type]
        res = {}
        final_res = {}
        if sport_type == SportType.FOOTBALL.value:
            for i in range(len(final_games)):
                game = final_games[i].get("teams").get("home").get("name") + " Vs " + final_games[i].get("teams").get(
                    "away").get("name")
                gameId = final_games[i].get("fixture").get("id")
                date = final_games[i].get("fixture").get("timestamp")
                res[i] = {}
                res[i]["game"] = game
                res[i]["game_id"] = gameId
            final_res = res

        elif sport_type == SportType.BASKETBALL.value:
            for i in range(len(final_games)):
                game = final_games[i].get("teams").get("home").get("name") + " Vs " + final_games[i].get("teams").get(
                    "away").get("name")
                gameId = final_games[i].get("id")
                date = final_games[i].get("timestamp")
                res[i] = {}
                res[i]["game"] = game
                res[i]["timestamp"] = date
                res[i]["game_id"] = gameId
                game_time = datetime.datetime.fromtimestamp(date)
                now = datetime.datetime.now()
                date_to_check = datetime.datetime.strptime(date_to, "%Y-%m-%d")
                if now < game_time < date_to_check:
                    final_res[i] = dict(res[i])

        print(f'games: {final_games}')
        return Response(final_res, status=status.HTTP_200_OK)


class GameViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request, sport_type=None, game_id=None):  # /game/{sport_type}/{game_id} GET
        print(f'get game {game_id}')
        final_game = {}
        response = getGame(sport_type, game_id)
        if not legalResponse(response):
            return Response(status=status.HTTP_404_NOT_FOUND)

        final_game = json.loads(response.text).get('response')
        print(f'game: {final_game}')
        return Response(final_game, status=status.HTTP_200_OK)
