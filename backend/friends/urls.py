from django.urls import path
from friends.views import createFriendRequest, acceptFriendRequest,denyFriendRequest,removeFriend, blockUser, unblockUser
app_name = 'friends'
urlpatterns = [
    path('request/<str:tousername>/', createFriendRequest, name = 'friendreq'),
    path('accept/<str:fromusername>/', acceptFriendRequest, name = 'friendacc'),
    path('deny/<str:fromusername>/', denyFriendRequest, name = 'friendden'),
    path('remove/<str:username>/', removeFriend, name = 'friendrem'),
    path('block/<str:username>/', blockUser, name = 'friendblk'),
    path('unblock/<str:username>/', unblockUser, name = 'friendublk'),
]
