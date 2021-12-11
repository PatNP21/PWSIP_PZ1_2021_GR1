from django.urls import path
from register.views import registerPage, changePassword, activateAcc
app_name = 'register'
urlpatterns = [
    path('', registerPage, name = 'registerPage'),
    path('changePassword/', changePassword, name = 'changePassword'),
    path('activate/',activateAcc, name = 'activateAcc')

]
