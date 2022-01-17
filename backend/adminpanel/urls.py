from django.urls import path
from django.urls.conf import include
from adminpanel.views import BlockUser, UnblockUser, DeletePost, DeleteComment
app_name = 'admin'

urlpatterns = [
   path('blockuser/<str:username>/', BlockUser, name = 'blockuser'),
   path('unblockuser/<str:username>/', UnblockUser, name = 'unblockuser'),
   path('deletepost/<str:idpost>/', DeletePost, name = 'deletepost'),
   path('deletecomment/<str:idcomment>/', DeleteComment, name = 'deletecomment'),
]

