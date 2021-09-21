from django.db import models


class Games(models.Model):
    team_a = models.CharField(max_length=200)
    team_b = models.CharField(max_length=200)
    details = models.CharField(max_length=200)
    id = models.PositiveIntegerField(default=0, primary_key=True)
