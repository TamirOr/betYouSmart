from bets.models import UserToBet, Bet
from bets.serializers import BetSerializer


class BetStatus(Enum):
    INIT = 0
    GAME_END = 1
    CONTRACT_UPDATE = 2


class GameWinner(Enum):
    HOME = '1'
    AWAY = '2'
    DRAW = '0'


def myBetsBodyGenerator(currentUserId):
    body = {}
    objects = UserToBet.objects.filter(user_uuid=currentUserId)
    for i in range(len(objects)):
        bet_object = Bet.objects.get(uuid=objects[i].bet_uuid)
        serializer = BetSerializer(bet_object)
        body[i] = serializer.data
    print(body)
    return body


def SearchBodyGenerator(objects):
    body = {}
    for i in range(len(objects)):
        # serializer for objects
        serializer = BetSerializer(objects[i])
        body[i] = serializer.data
    print(body)
    return body
