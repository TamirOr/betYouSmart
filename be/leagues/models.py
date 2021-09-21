from django.db import models


class League(models.Model):
    name = models.CharField(max_length=30)
    id = models.PositiveIntegerField(default=0, primary_key=True)


