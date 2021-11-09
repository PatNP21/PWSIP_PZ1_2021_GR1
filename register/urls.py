from django.urls import path
from register.views import registerPage
app_name = 'register'
urlpatterns = [
    path('', registerPage, name = 'registerPage'),

]
