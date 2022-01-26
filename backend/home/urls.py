from django.urls import path
from home.views import registeredUserCount
app_name = 'home'
urlpatterns = [
    path('userscount/', registeredUserCount, name = 'RegisteredUserCount'),
]
