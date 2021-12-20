from django.urls import path

from posts.views import createpost, getpost
app_name = 'posts'
urlpatterns = [
    path("createpost/", createpost, name = "createpost"),
    path("get/<str:idpost>/", getpost, name = "getpost")
]
