from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic import CreateView, ListView
from .forms import RegisterForm
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from .models import Profile, Follow
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from music.models import Song, Repost


class RegisterView(CreateView):
    form_class = RegisterForm
    template_name = 'user/register.html'
    success_url = reverse_lazy('login')

    def form_valid(self, form):
        response = super().form_valid(form)  
        user = self.object 
        print(user)
        Profile.objects.create(user=user)  # Теперь создаём профиль
        return response
    
    
    

# Create your views here.
class UserProfileView(TemplateView):
    template_name = 'user/profile.html'
    extra_context = {'page_class': 'no-div3'}
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        username = self.kwargs['username']
        user = get_object_or_404(User, username=username)
        profile = get_object_or_404(Profile, user=user)
        
        followers_count = Follow.objects.filter(followed=profile).count()
        following_count = Follow.objects.filter(follower=profile).count()
        tracks_count = Song.objects.filter(uploaded_by=profile.user).count()

        context['followers_count'] = followers_count
        context['following_count'] = following_count
        context['tracks_count'] = tracks_count
        context['profile'] = profile
        context['is_owner'] = (user == self.request.user)
        
        reposts = Repost.objects.filter(user=user).select_related('song')
        uploads = Song.objects.filter(uploaded_by=user)
        recent = sorted(
            list(reposts) + list(uploads),
            key=lambda x: x.timestamp if hasattr(x, 'timestamp') else x.uploaded_at,
            reverse=True
        )
        print(user.liked_songs.all(), 'zalupa')
        context['recent_activity'] = recent
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


@require_POST
@login_required
def toggle_follow(request):
    username = request.POST.get('username')
    current_profile = request.user.profile
    target_user = get_object_or_404(User, username=username)


    if target_user in current_profile.following.all():
        current_profile.following.remove(target_user)
        following = False
    else:
        current_profile.following.add(target_user)
        following = True

    return JsonResponse({"following": following})


@login_required
def feed_activity(request):
    followed_users = list(request.user.profile.following.all()) + [request.user]
    uploads = Song.objects.filter(uploaded_by__in=followed_users)
    reposts = Repost.objects.filter(user__in=followed_users)
    print(followed_users)
    print(uploads)
    return render(request, 'user/feed_activity.html', {'followers': followed_users, 'page_class': 'no-div3', 'uploads' : uploads, 'reposts' : reposts})
    