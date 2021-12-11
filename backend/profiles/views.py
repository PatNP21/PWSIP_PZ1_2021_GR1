from rest_framework import serializers
from home.models import User, Session
from login.serializers import LoginSerializer, IsLoggedInSerializer
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
            user = User.objects.get(username__iexact = session.username)
            return Response({
                'username' : user.username,
                'email' : user.email,
                'firstname' : user.firstname,
                'lastname' : user.lastname,
                'DOB' : user.DOB 
            })
        except Session.DoesNotExist:
            return Response({
                "errors": "Not logged in"
            })
    else: 
        return Response({
            "errors" : "Internal error"
        })
@api_view(["GET"])
@renderer_classes([JSONRenderer])
def profile(request,username):
    try:
        user = User.objects.get(username__iexact = username)
        return Response({
            'username' : user.username,
            'firstname' : user.firstname,
            'lastname' : user.lastname
        })
    except User.DoesNotExist:
        return Response({
            "errors" : "User does not exists"
        }) 