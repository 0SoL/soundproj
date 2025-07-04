from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django import forms


class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']
        
class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'placeholder': ' ',
            'autocomplete': 'off',
        }),
        label=''  # <--- убираем label
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'placeholder': ' ',
        }),
        label=''
    )