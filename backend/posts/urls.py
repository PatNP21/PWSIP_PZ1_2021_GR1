from django.urls import path

from posts.views import createpost

app_name = 'posts'
urlpatterns = [
    path("createpost/", createpost, name = "createpost")

]
