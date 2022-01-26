from django.urls import path
from adminpanel.views import blockUser, unblockUser, deletePost, deleteComment
app_name = 'admin'

urlpatterns = [
   path('blockuser/<str:username>/', blockUser, name = 'blockuser'),
   path('unblockuser/<str:username>/', unblockUser, name = 'unblockuser'),
   path('deletepost/<str:idpost>/', deletePost, name = 'deletepost'),
   path('deletecomment/<str:idcomment>/', deleteComment, name = 'deletecomment'),
]

