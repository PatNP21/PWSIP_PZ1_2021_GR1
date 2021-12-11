from django.urls import path
from profiles.views import myprofile,profile


app_name = 'profiles'
urlpatterns = [
    path('myprofile/', myprofile, name = 'myprofile'),
    path('<str:username>/', profile, name = 'profile'),
]
