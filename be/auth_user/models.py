from django.contrib.auth.models import User
from django.db import models


class Wallet(models.Model):
    username = models.CharField(max_length=200, default='0')
    wallet_address = models.CharField(max_length=200, default='0')
