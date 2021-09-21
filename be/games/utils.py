import datetime
import requests as r
from enum import Enum
from rest_framework import status
from rest_framework.response import Response

from leagues.leagues_dict import SOCCER_LEAGUE_IDS, BASKETBALL_LEAGUE_IDS


class SportType(Enum):
    FOOTBALL = '1'
    BASKETBALL = '2'


def getGames(sportType, league, date_to):
    leagueId = SOCCER_LEAGUE_IDS.get("leagues").get(league) if sportType == SportType.FOOTBALL.value \
        else BASKETBALL_LEAGUE_IDS.get("leagues").get(league)
    if leagueId is None:
        print("error- league doesn't exist")
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    now = datetime.datetime.now()
    date_to = datetime.datetime.strftime(date_to, "%Y-%m-%d")
    date_from = now.strftime("%Y-%m-%d")
    if sportType == SportType.FOOTBALL.value:
        game = 'fixtures'
        v = 'v3'
        season = '2021'
        queryParam = '/' + game + '?league=' + leagueId + '&season=' + season + '&from=' + date_from + '&to=' + date_to + '&timezone=Asia/jerusalem'
        uri = 'https://' + v + '.' + 'football' + '.api-sports.io'
        url = uri + queryParam
    elif sportType == SportType.BASKETBALL.value:
        game = 'games'
        v = 'v1'
        season = '2021-2022'
        queryParam = '/' + game + '?league=' + leagueId + '&season=' + season + '&timezone=Asia/jerusalem'
        uri = 'https://' + v + '.' + 'basketball' + '.api-sports.io'
        url = uri + queryParam
    response = []
    headers = {
        'x-rapidapi-key': 'c7166a8aceba738fd867b437e4d534c7'
    }
    print("call to extern API")
    return r.request("GET", url, headers=headers)


def getGame(sport_type, game_id):
    headers = {
        'x-rapidapi-key': 'ac8ce17836f366ccc64ff29aaa400ed6'
    }
    if sport_type == SportType.FOOTBALL.value:
        url = f'https://v3.football.api-sports.io/fixtures?id={game_id}'
    elif sport_type == SportType.BASKETBALL.value:
        url = f'https://v1.basketball.api-sports.io/games?id={game_id}'
    print("call to extern API")
    return r.request("GET", url, headers=headers)
