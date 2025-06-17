from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='songs/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    cover = models.ImageField(upload_to='covers/', null=True, blank=True) 
    liked_by = models.ManyToManyField(User, related_name='liked_songs', blank=True)

    def __str__(self):
        return f"{self.title} — {self.artist}"