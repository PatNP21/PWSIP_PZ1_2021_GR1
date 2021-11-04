from django.urls import path
from drawitapp.views import mainPage;
urlpatterns = [
    path('', mainPage),
]