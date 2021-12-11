from django.shortcuts import render
# Create your views here.

def homePage(request):
    user_data = {}
    if 'loggedin' in request.session:
        if request.session['loggedin'] == True:
                user_data = {'user': request.session['loggedas']}
    return render(request,'home/index.html',{ 
        'user_data' : user_data
    })