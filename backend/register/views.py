from random import randrange
from home.models import User, Session , UserActivation, UserPasswordChange
from register.serializers import RegisterSerializer, ChangePasswordSerializer, ActivateAccSerializer, PasswordRecoverySerializer, RecoverSerializer
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
            code = str(randrange(10000,99999))
            UserActivation.objects.create(
                username = serializer.data['username'],
                code = code
            )
            subject = "Witaj na drawit"
            message = "Witaj %s na Draw.it Kod do rejestracji %s" % (serializer.data['username'],code)
            send_mail(subject= subject, message= message, recipient_list= [serializer.data['email']], from_email= None), 
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
                code = str(randrange(10000,99999))
                UserPasswordChange.objects.create(username = user.username, code = code, newpass = newpass)
                subject = "Zmiana hasłą"
                message = "Kod do zmiany hasła %s" % code
                send_mail(subject= subject, message= message, recipient_list= [user.email], from_email= None), 
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

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def confirmChange(request):
    serializer = ActivateAccSerializer(data = request.data)
    if serializer.is_valid():
        code = serializer.data['code']
        try:
            actuser = UserPasswordChange.objects.get(code = code)
            user = User.objects.get(username = actuser.username)
            user.changepass(actuser.newpass)
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

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def recoverPassword(request):
    serializer = PasswordRecoverySerializer(data = request.data)
    if serializer.is_valid():
        try:
            email = serializer.data['email']
            user = User.objects.get(email = email)
            code = str(randrange(10000,99999))
            UserPasswordChange.objects.create(username = user.username, newpass = "-1",code = code)
            subject = "Odzyskiwanie hasła"
            message = "Kod do odzyskania hasła %s" % code
            send_mail(subject= subject, message= message, recipient_list= [email], from_email= None),
            return Response({
                'success': True,
                'errors' : "Brak"
            })
        except User.DoesNotExist:
            return Response({
                'success': False,
                'errors' : "Podano błędny mail"
            })
    else:
        return Response({"XD":'XD'})

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def recovery(request):
    serializer = RecoverSerializer(data = request.data)
    if serializer.is_valid():
        try:
            code = serializer.data['code']
            newpass = serializer.data['newpass']
            recuser = UserPasswordChange.objects.get(code = code)
            user = User.objects.get(username = recuser.username)
            user.changepass(newpass)
            recuser.delete()
            return Response({
                'success': True,
                'errors' : "Brak"
            })
        except UserPasswordChange.DoesNotExist:
            return Response({
                'success': False,
                'errors' : "Podano błędny kod"
            })
