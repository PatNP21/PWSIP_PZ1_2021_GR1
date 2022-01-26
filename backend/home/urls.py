from django.urls import path
from home.views import registeredUserCount,postsCount
app_name = 'home'
urlpatterns = [
    path('userscount/', registeredUserCount, name = 'RegisteredUserCount'),
    path("postcount/",postsCount, name = "pc")
]
