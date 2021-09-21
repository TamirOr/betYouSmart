import json
import logging
import requests
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from django.conf import settings

from admin.utils import legalResponse
from games.utils import SportType
from .models import Bet
from .utils import BetStatus, GameWinner

scheduler = BackgroundScheduler(settings.SCHEDULER_CONFIG)


def update_victory(game_id, sport_type):
    print("update victory of game: " + game_id)
    headers = {
        'x-rapidapi-key': 'ac8ce17836f366ccc64ff29aaa400ed6'
    }
    winner = ''
    if sport_type == SportType.FOOTBALL.value:
        print("call to extern API")
        url = f'https://v3.football.api-sports.io/fixtures?id={game_id}'
        response = requests.request("GET", url, headers=headers)
        if not legalResponse(response):
            print(f'error get game- {response.text}')
            return Response(status=status.HTTP_404_NOT_FOUND)

        response_json = json.loads(response.text)
        home = response_json['response'][0]['teams']['home']['winner']
        away = response_json['response'][0]['teams']['away']['winner']
        if home:
            winner = GameWinner.HOME.value
        elif away:
            winner = GameWinner.AWAY.value
        else:
            winner = GameWinner.DRAW.value

    elif sport_type == SportType.BASKETBALL.value:
        print("call to extern API")
        url = f'https://v1.basketball.api-sports.io/games?id={game_id}'
        response = requests.request("GET", url, headers=headers)
        if not legalResponse(response):
            print(f'error get game- {response.text}')
            return Response(status=status.HTTP_404_NOT_FOUND)

        response_json = json.loads(response.text)
        home = response_json['response'][0]['scores']['home']['total']
        away = response_json['response'][0]['scores']['away']['total']
        winner = GameWinner.HOME.value if int(home) > int(away) else GameWinner.AWAY.value

    game_to_update = Bet.objects.filter_by(uuid=game_id, active=True).all()
    game_to_update.status = BetStatus.GAME_END.value
    game_to_update.winner = winner
    game_to_update.save()


def update_db_game_started(bet_uuid):
    print("update start of game: " + bet_uuid)
    game_to_update = Bet.objects.filter_by(uuid=bet_uuid, active=True).all()
    game_to_update.active = False
    game_to_update.save()


def update_scheduler(uuid, time_stamp, game_id, sport_type):
    print(f'update scheduler, bet - {uuid}, time - {time_stamp}, game id - {game_id}')
    start_time = datetime.fromtimestamp(int(time_stamp))
    game_end_time = start_time + timedelta(hours=3)
    scheduler.add_job(func=update_victory, run_date=game_end_time, args=[game_id, sport_type],
                      id=uuid + 'update_victory', replace_existing=True)
    scheduler.add_job(func=update_db_game_started, run_date=start_time - timedelta(minutes=5), args=[uuid],
                      id=uuid + 'update_db', replace_existing=True)
