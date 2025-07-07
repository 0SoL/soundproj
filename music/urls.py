from django.urls import path
from .views import SongListView, UploadSongView, SongDetailView
from .views import toggle_like, liked_songs

urlpatterns = [
    path('', SongListView.as_view(), name='home'),
    path('upload/', UploadSongView.as_view(), name='upload'),
    path('like/', toggle_like, name='toggle_like'),
    path('liked/', liked_songs, name='liked_songs'),
    path('<slug:slug>/', SongDetailView.as_view(), name='song-detail')
]