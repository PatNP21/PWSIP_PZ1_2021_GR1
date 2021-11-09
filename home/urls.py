from django.shortcuts import redirect
from django.urls import path

from home.views import homePage
app_name = 'home'
urlpatterns = [
    path('', homePage, name = 'homePage')
]
