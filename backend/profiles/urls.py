from django.urls import path
from profiles.views import myprofile,profile,changeprofile

app_name = 'profiles'
urlpatterns = [
    path('myprofile/', myprofile, name = 'myprofile'),
    path('get/<str:username>/', profile, name = 'profile'),
    path('changeprofile/',changeprofile, name = 'changeprofile')
]
