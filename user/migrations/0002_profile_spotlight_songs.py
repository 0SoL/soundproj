# Generated by Django 5.2.3 on 2025-06-24 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0005_song_album'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='spotlight_songs',
            field=models.ManyToManyField(blank=True, null=True, related_name='spotlighted_by', to='music.song'),
        ),
    ]
