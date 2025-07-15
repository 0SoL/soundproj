from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from music.models import Song


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=30, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    banner = models.ImageField(upload_to='banners/', blank=True, null=True)
    bio = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    
    following = models.ManyToManyField(
        User,
        related_name='followers',  # user.followers.all() вернёт профили, которые его фолловят
        blank=True,
        symmetrical=False           # обязательно, чтобы “я на тебя подписан” ≠ “ты на меня подписан”
    )
    spotlight_songs = models.ManyToManyField(Song, blank=True,null=True ,related_name='spotlighted_by')

    def clean(self):
        if self.spotlight_songs.count() > 4:
            raise ValidationError("You can only have up to 4 spotlight songs.")
        
    
    def __str__(self):
        return f"{self.user.username}'s profile"
    
class Follow(models.Model):
    follower = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='follows'      # связи, где я – подписчик
    )
    followed = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='followed_by'  # связи, где я – тот, на кого подписываются
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed')

    def __str__(self):
        return f'{self.follower} → {self.followed}'
# Create your models here.
