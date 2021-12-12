from django.urls import conf, path
from register.views import registerPage, changePassword, activateAcc, confirmChange
app_name = 'register'
urlpatterns = [
    path('', registerPage, name = 'registerPage'),
    path('changePassword/', changePassword, name = 'changePassword'),
    path('activate/',activateAcc, name = 'activateAcc'),
    path('confirmChange/',confirmChange, name = 'confirmChange')

]
