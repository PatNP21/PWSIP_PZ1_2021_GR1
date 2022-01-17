from django.contrib import admin
from home.models import User, Session, UserActivation, UserPasswordChange, BlockedUser
# Register your models here.
admin.site.register(User)
admin.site.register(Session)
admin.site.register(UserActivation)
admin.site.register(UserPasswordChange)
admin.site.register(BlockedUser)