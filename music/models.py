from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    cover = models.ImageField(upload_to='covers/', null=True, blank=True, default="/Users/rustam/Desktop/soundproj/static/images/placeholder.png") 
    created_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.title} — {self.artist}"


class Song(models.Model):
    title = models.CharField(max_length=255)
    album = models.ForeignKey(Album, on_delete=models.SET_NULL, null=True, blank=True, related_name='songs')
    artist = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='songs/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_by = models.ManyToManyField(User, related_name='liked_songs', blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    slug = models.SlugField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} — {self.artist}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.title}-{self.artist}")
        super().save(*args, **kwargs)
    
    
class Repost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        unique_together = ('user', 'song')  

    def __str__(self):
        return f"{self.user.username} репостнул {self.song.title}"


class Comment(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Комментарий от {self.author.username} к {self.song.title}"