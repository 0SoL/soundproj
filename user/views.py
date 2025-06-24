from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import CreateView
from .forms import RegisterForm
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from .models import Profile
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from music.models import Song

class RegisterView(CreateView):
    form_class = RegisterForm
    template_name = 'register.html'
    success_url = reverse_lazy('login')
# Create your views here.
class UserProfileView(TemplateView):
    template_name = 'user/profile.html'
    extra_context = {'page_class': 'no-div3'}
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        username = self.kwargs['username']
        user = get_object_or_404(User, username=username)

        profile = get_object_or_404(Profile, user=user)
        context['profile'] = profile
        context['is_owner'] = (user == self.request.user)

        if user == self.request.user:
            context['liked_songs'] = user.liked_songs.all()

        return context


def update_banner(request):
    if request.method == 'POST' and request.FILES.get('banner'):
        request.user.profile.banner = request.FILES['banner']
        request.user.profile.save()
    return redirect('profile', username=request.user.username)

def update_avatar(request):
    if request.method == 'POST' and request.FILES.get('avatar'):
        request.user.profile.avatar = request.FILES['avatar']
        request.user.profile.save()
    return redirect('profile', username=request.user.username)


@require_POST
@login_required
def update_spotlight(request):
    # получаем все выбранные song_ids
    ids = request.POST.getlist('song_ids')
    if len(ids) > 4:
        return JsonResponse({'error': 'Не более 4 треков!'}, status=400)

    songs = Song.objects.filter(id__in=ids, liked_by=request.user)
    request.user.profile.spotlight_songs.set(songs)
    return JsonResponse({'message': 'Spotlight обновлён!'})