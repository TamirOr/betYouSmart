# Generated by Django 3.2.7 on 2021-09-14 20:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bets', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bet',
            name='details',
        ),
        migrations.RemoveField(
            model_name='bet',
            name='wallet_address',
        ),
    ]