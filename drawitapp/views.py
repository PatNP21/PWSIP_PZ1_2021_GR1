from django.shortcuts import render

from drawitapp.forms import UserForm

# Create your views here.
def mainPage(request):
    return render(request,'index.html')

def loginPage(request):
    form = UserForm()
    return render(request, "login.html", {
        'form' : form
    })