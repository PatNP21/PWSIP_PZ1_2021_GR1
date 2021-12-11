from django.db.models.base import Model
from home.models import User
from register.serializers import RegisterSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
@api_view(['POST'])
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
