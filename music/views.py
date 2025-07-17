from django.views.generic import CreateView, ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Song, Album
from .forms import SongUploadForm, CommentForm
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST


class UploadSongView(LoginRequiredMixin, CreateView):
    model = Song
    form_class = SongUploadForm
    template_name = 'music/upload.html'
    success_url = reverse_lazy('home')  # после загрузки — на главную
    extra_context = {'page_class': 'no-div3'}

    def form_valid(self, form):
        song = form.save(commit=False)
        user = self.request.user

        album_title = f"Single: {song.title}"
        album, created = Album.objects.get_or_create(
            title=album_title,
            artist=song.artist,
            uploaded_by=user,
            defaults={'cover': 'images/placeholder.png'}  # относительный путь от MEDIA_ROOT
        )

        song.album = album
        song.uploaded_by = user
        song.save()
        
        return redirect(self.success_url)

class SongListView(ListView):
    model = Song
    template_name = 'music/index.html'
    context_object_name = 'songs'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.user.is_authenticated:
            liked_songs = self.request.user.liked_songs.values_list('id', flat=True)
        else:
            liked_songs = []

        context['liked_songs'] = liked_songs
        return context
    

@require_POST
@login_required
def toggle_like(request):
    song_id = request.POST.get('song_id')
    song = get_object_or_404(Song, id=song_id)

    if request.user in song.liked_by.all():
        song.liked_by.remove(request.user)
        liked = False
    else:
        song.liked_by.add(request.user)
        liked = True

    return JsonResponse({'liked': liked})


@login_required
def liked_songs(request):
    songs = request.user.liked_songs.all()
    return render(request, 'music/liked.html', {'songs': songs, 'page_class': 'no-div3'})


class SongDetailView(DetailView):
    model = Song
    template_name = "music/song_detail.html"
    context_object_name = 'song'
    extra_context = {'page_class': 'no-div3'}

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comments'] = self.object.comments.all()
        context['form'] = CommentForm()
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.song = self.object
            comment.author = request.user
            comment.save()
            return redirect(self.request.path)
        context = self.get_context_data()
        context['form'] = form
        return self.render_to_response(context)
    