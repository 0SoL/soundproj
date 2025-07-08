from django.contrib import admin
from .models import Song, Album, Repost, Comment
# Register your models here.

admin.site.register(Song)
admin.site.register(Album)
admin.site.register(Repost)
admin.site.register(Comment)