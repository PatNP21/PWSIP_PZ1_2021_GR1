from django.urls import path
from register.views import registerPage, changePassword
app_name = 'register'
urlpatterns = [
    path('', registerPage, name = 'registerPage'),
    path('changePassword/', changePassword, name = 'changePassword'),

]
