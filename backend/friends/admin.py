from django.contrib import admin
from friends.models import UserFriend,FriendRequest
# Register your models here.
admin.site.register(UserFriend)
admin.site.register(FriendRequest)