from django.shortcuts import render
# Create your views here.


def homePage(request):
    register_data = {'user': 'ggg'}
    if 'temp' in request.session:
        register_data = {'user': request.session['temp']}
    return render(request,'home/index.html',{ 'register_data' : register_data
        
    })