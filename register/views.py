from django.shortcuts import render

from register.forms import RegisterForm

# Create your views here.
def registerPage(request):
    form = RegisterForm()
    return render(request, 'register/register.html',{
        'form' : form
    })