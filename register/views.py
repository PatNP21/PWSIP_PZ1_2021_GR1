from django.http.response import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import redirect, render

from register.forms import RegisterForm

# Create your views here.
def registerPage(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        
        if form.is_valid():
            request.session['temp'] = form.cleaned_data['username']
            form.save()
            return redirect('home:homePage')
        else:
            return HttpResponse("UR BAD")
    else:
        form = RegisterForm()
        return render(request, 'register/register.html',{
            'form' : form
        })