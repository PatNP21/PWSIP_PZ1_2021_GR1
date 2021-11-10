from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from home.models import User
from login.forms import LoginForm

# Create your views here.
def loginPage(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            try:
                user = User.objects.get(username = form.cleaned_data['username'])
                if form.cleaned_data['password'] == user.password:
                    request.session['loggedin'] = True
                    request.session['loggedas'] = user.username
                    return redirect('home:homePage')
            except User.DoesNotExist:
                form = LoginForm()
                return render(request, 'login/login.html', {
                    'form' : form
                })
        else:
            print(form.errors)
            return HttpResponse("UR BAD")
    else:
        form = LoginForm()
        return render(request, 'login/login.html', {
            'form' : form
        })

def logoutPage(request):
    if 'loggedin' in request.session:
        if request.session['loggedin'] == True:
            try:
                del request.session['loggedin']
                del request.session['loggedas']
            except KeyError:
                pass
            return render(request, 'login/logout/logout.html')

    else:
        return redirect('home:homePage')

    