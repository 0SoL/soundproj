from django.views.generic import CreateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Song
from .forms import SongUploadForm
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST


class UploadSongView(LoginRequiredMixin, CreateView):
    model = Song
    form_class = SongUploadForm
    template_name = 'music/upload.html'
    success_url = reverse_lazy('home')  # после загрузки — на главную

    def form_valid(self, form):
        form.instance.uploaded_by = self.request.user
        return super().form_valid(form)

class SongListView(ListView):
    model = Song
    template_name = 'music/index.html'
    context_object_name = 'songs'
    

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