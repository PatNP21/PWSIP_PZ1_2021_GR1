from django.urls import path
from login.views import loginPage, isloggedin, logout

app_name = 'login'
urlpatterns = [
    path('', loginPage, name = 'loginPage'),
    path('loggedin/', isloggedin, name = 'isloggedin'),
    path('logout/', logout, name = 'logout')
]
