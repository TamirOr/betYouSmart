# Generated by Django 3.2.7 on 2021-09-11 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Games',
            fields=[
                ('team_a', models.CharField(max_length=200)),
                ('team_b', models.CharField(max_length=200)),
                ('details', models.CharField(max_length=200)),
                ('id', models.PositiveIntegerField(default=0, primary_key=True, serialize=False)),
            ],
        ),
    ]
