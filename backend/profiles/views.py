from profiles.serializers import DataChangeSerializer
from home.models import User, Session
from login.serializers import IsLoggedInSerializer
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
# Create your views here.
@api_view(["POST"])
@renderer_classes([JSONRenderer])
def myprofile(request):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        try:
            session = Session.objects.get(sessionid = serializer.data["sessionid"])
            if session.isexpired():
                return Response({
                'success' : False,
                'loggedin': False
                })
            user = User.objects.get(username__iexact = session.username)
            return Response({
                'success' : True,
                'username' : user.username,
                'email' : user.email,
                'firstname' : user.firstname,
                'lastname' : user.lastname,
                'dateofbirth' : user.dateofbirth 
            })
        except Session.DoesNotExist:
            return Response({
                'success' : False,
                "errors": "Not logged in"
            })
    else: 
        return Response({
            'success' : False,
            "errors" : "Internal error"
        })

@api_view(["GET"])
@renderer_classes([JSONRenderer])
def profile(request,username):
    print(username)
    try:
        user = User.objects.get(username__iexact = username)
        return Response({
            'success' : True,
            'username' : user.username,
            'firstname' : user.firstname,
            'lastname' : user.lastname
        })
    except User.DoesNotExist:
        return Response({
            'success' : False,
            "errors" : "User does not exists"
        }) 

@api_view(["POST"])
@renderer_classes([JSONRenderer])
def changeprofile(request):
    serializer = DataChangeSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid =  serializer.data["sessionid"]
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'loggedin': False
                })
            user = User.objects.get(username__iexact = session.username)
            email = serializer.data["email"]
            firstname = serializer.data["firstname"]
            lastname = serializer.data["lastname"]
            dateofbirth = serializer.data["dateofbirth"]
            user.changeprofiledata(email,firstname,lastname,dateofbirth)
            ## OUT OF DATE OF BIRTH YET
            return Response({
                'success' : True
            })       
            

        except Session.DoesNotExist:
            return Response({
                'success' : False,
                "errors":"User isn't logged in"
            })
    else:
        return Response({
            'success' : False,
            "errors":"Nieprawidlowy format danych"
        })


