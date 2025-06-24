from django.urls import path
from .views import RegisterView, UserProfileView
from django.contrib.auth.views import LoginView, LogoutView
from . import views


urlpatterns = [
    path('update-spotlight/', views.update_spotlight, name='update_spotlight'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page='/'), name='logout'),
    path('profile/update-banner/', views.update_banner, name='update_banner'),
    path('profile/update-avatar/', views.update_avatar, name='update_avatar'),
    path('<str:username>/', UserProfileView.as_view(), name='profile'),
]