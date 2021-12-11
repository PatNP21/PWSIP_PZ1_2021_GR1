from random import randrange
from home.models import User, Session , UserActivation
from register.serializers import RegisterSerializer, ChangePasswordSerializer, ActivateAccSerializer
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def registerPage(request):
    serializer = RegisterSerializer(data = request.data)
    if serializer.is_valid():
        queryset = User.objects.filter(username = serializer.data['username']) | User.objects.filter(email = serializer.data['email'])
        if not queryset:
            #Verify something here#
            User.objects.create(
                username = serializer.data['username'],
                password = serializer.data['password'],
                email = serializer.data['email'],
                firstname = serializer.data['firstname'],
                lastname = serializer.data['lastname'],
                DOB = serializer.data['DOB'],
                activated = False
            )
            UserActivation.objects.create(
                username = serializer.data['username'],
                code = str(randrange(10000,99999))
            )
            subject = "Witaj na drawit"
            message = "Witaj %s na Draw.it Aby dokonczyc rejestracje zrob to i tamto elo" % serializer.data['username']
            send_mail(subject= subject, message= message, recipient_list= [serializer.data['email']], from_email= None), 
            print("JA")
            return Response({
                'errors': "Brak"
            })
        else:
            return Response({
                'errors': "Użytkownik istnieje"
            })
    else:
        return Response({
            'errors' : 'Nieprawidłowy format'
        }) 
            
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def changePassword(request):
    serializer = ChangePasswordSerializer(data = request.data)
    if serializer.is_valid():
        sessionid = serializer.data['sessionid']
        oldpass = serializer.data['oldpass']
        newpass = serializer.data['newpass']
        try:
            session = Session.objects.get(sessionid)
            user = User.objects.get(username__iexact = session.username)
            if oldpass == user.password:
                user.changepass(newpass)
                return Response({
                    'success': True,
                    'errors' : "Brak"
                })
            else:
                return Response({
                    'success': False,
                    'errors' : "Nieprawidłowe hasło"
                })

        except Session.DoesNotExist:
            return Response({
                'success': False,
                'errors' : "Niezalogowany"
            })
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def activateAcc(request):
    serializer = ActivateAccSerializer(data = request.data)
    if serializer.is_valid():
        code = serializer.data['code']
        try:
            actuser = UserActivation.objects.get(code = code)
            user = User.objects.get(username = actuser.username)
            user.activateuser()
            actuser.delete()
            return Response({
                'success': True,
                'errors' : "Brak"
            })
        except UserActivation.DoesNotExist:
            return Response({
                'success': False,
                'errors' : "Podano błędny kod"
            })

