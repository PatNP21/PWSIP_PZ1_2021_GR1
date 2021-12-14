from django.shortcuts import redirect
from django.urls import path
from home.views import RegisteredUserCount
app_name = 'home'
urlpatterns = [
    path('userscount/', RegisteredUserCount, name = 'RegisteredUserCount'),
]
