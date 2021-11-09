from django.urls import path
from drawitapp.views import loginPage, mainPage;
urlpatterns = [
    path('', mainPage),
    path('login', loginPage),
]