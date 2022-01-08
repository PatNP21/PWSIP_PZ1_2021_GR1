from django.urls import path
from django.urls.conf import include
from comments.views import createComment
app_name = 'comments'

urlpatterns = [
    path('create/<int:idpost>/',createComment, name= "createComment")
]
