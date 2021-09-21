from django.db import models

from .utils import BetStatus


class Bet(models.Model):
    uuid = models.CharField(max_length=200, default='0')
    team_a = models.CharField(max_length=200, default='0')
    team_b = models.CharField(max_length=200, default='0')
    private = models.BooleanField(default=True)
    league = models.CharField(max_length=200, default='0')
    active = models.BooleanField(default=True)
    game = models.CharField(max_length=200, default='0')
    game_id = models.CharField(max_length=200, default='0')
    date = models.CharField(max_length=200, default='0')
    sport_type = models.CharField(max_length=200, default='0')
    time_stamp = models.CharField(max_length=200, default='0')
    contract_address = models.CharField(max_length=200, default='0')
    ratio = models.CharField(max_length=200, default='0')
    mivValuePerParticipant = models.PositiveIntegerField(default=0)
    minBudgetToStartContract = models.PositiveIntegerField(default=0)
    creatorBudget = models.PositiveIntegerField(default=0)
    creatorGuess = models.PositiveIntegerField(default=0)
    participantMaxPossibleBudget = models.PositiveIntegerField(default=0)
    status = models.PositiveIntegerField(default=BetStatus.INIT.value)
    winner = models.CharField(max_length=200, default='-1')


class UserToBet(models.Model):
    user_uuid = models.CharField(max_length=200)
    bet_uuid = models.CharField(max_length=200)
