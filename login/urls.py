from django.urls import path
from login.views import loginPage

app_name = 'login'
urlpatterns = [
    path('', loginPage, name = 'loginPage')
]
