from home.models import User, Session
from random import randrange
from datetime import datetime, timedelta
from login.serializers import LoginSerializer, IsLoggedInSerializer
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def loginPage(request):
    serializer = LoginSerializer(data = request.data)
    if serializer.is_valid():
        try:
            user = User.objects.get(username__iexact = serializer.data['username'], password = serializer.data['password'])
            if user.activated == False:
                return Response({
                'errors': 'Nieaktywowane konto',
                'login' : False
                })
            try:
                session = Session.objects.get(username = user.username)
                session.delete()
            except Session.DoesNotExist:
                pass
            sessionid = str(randrange(2000))
            expires = datetime.now()+ timedelta(minutes=10)
            Session.objects.create(sessionid = sessionid, username = user.username, expires = expires)
            return Response({
                'errors' : "Brak",
                'login' : True,
                'sessionid' : sessionid 
            })
        except User.DoesNotExist:
            print("Avutalllsa")
            return Response({
                'errors': 'Nieprawidłowy login i/lub hasło',
                'login' : False
                })
    else:
        return Response({
            'errors': 'Nieprawidłowy format',
            'login' : False
        })
@api_view(["POST"])
@renderer_classes([JSONRenderer])
def isloggedin(request):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        try:
            session = Session.objects.get(sessionid=serializer.data['sessionid'])
            if session.isexpired():
                return Response({
                'loggedin': False
                })
            else:
                session.extend()
                return Response({
                    'loggedin': True
                })

        except Session.DoesNotExist:
            return Response({
                'loggedin': False
            })
    else:
        return Response({
            "errors" : "DAAA"
        })
@api_view(["POST"])
@renderer_classes([JSONRenderer])
def logout(request):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        try:
            session = Session.objects.get(sessionid=serializer.data['sessionid'])
            session.delete()
        except Session.DoesNotExist:
            pass
        return Response({
            "loggedout" : True
        })
    else:
        return Response({
            "errors" : "DAAA"
        })

