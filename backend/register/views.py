from home.models import User, Session
from register.serializers import RegisterSerializer, ChangePasswordSerializer
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def registerPage(request):
    if request.method == 'POST':
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
                    DOB = serializer.data['DOB']
                )
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

        try:
            session = Session.objects.get(sessionid)
            
        except Session.DoesNotExist:
            pass
