from django.urls import path
from login.views import loginPage, logoutPage

app_name = 'login'
urlpatterns = [
    path('', loginPage, name = 'loginPage'),
    path('logout/', logoutPage, name = 'logoutPage')
]
