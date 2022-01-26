from rest_framework import serializers
from friends.serializers import FriendRequestSerializer
from home.models import User, Session
from random import randrange
from datetime import timedelta
from login.serializers import LoginSerializer, IsLoggedInSerializer
from friends.serializers import FriendRequestSerializer
from friends.models import UserFriend, FriendRequest
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
from scripts.serializeFriendRequests import serializeFriendRequest
# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def createFriendRequest(request,tousername):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
            try:
                obj = User.objects.get(username__iexact = tousername)
            except User.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'User does not exist'
                })
            fromusername = session.username
            if fromusername == tousername:
                return Response({
                    'success' : False,
                    'errors' : 'Can\'t befriend yourself lol'
                })
            
            touserFriends = UserFriend.objects.get(username__iexact = tousername)
            try:
                obj = FriendRequest.objects.get(fromusername = fromusername, tousername = tousername)
                return Response({
                    'success' : False,
                    'errors' : 'Already sent'
                })
            except FriendRequest.DoesNotExist:
                pass
            try:
                obj = FriendRequest.objects.get(tousername = fromusername, fromusername = tousername)
                return Response({
                    'success' : False,
                    'errors' : 'That user sent you friend request'
                })
            except FriendRequest.DoesNotExist:
                pass
            if touserFriends.isFriend(fromusername):
                return Response({
                    'success' : False,
                    'errors' : 'Already a friend'
                })
            if touserFriends.isBlocked(fromusername):
                return Response({
                    'success' : False,
                    'errors' : 'Blocked by user'
                })
            FriendRequest.objects.create(fromusername = fromusername, tousername = tousername)
            return Response({
                    'success' : True,
                    'errors' : "Brak"
                })

        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def acceptFriendRequest(request,fromusername):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            tousername = session.username
            try:
                print(fromusername)
                print(tousername)
                obj = FriendRequest.objects.get(fromusername = fromusername, tousername = tousername)
                touser = UserFriend.objects.get(username__iexact = tousername)
                fromuser = UserFriend.objects.get(username__iexact = fromusername)
                touser.addFriend(fromusername)
                fromuser.addFriend(tousername)
                obj.delete()
                return Response({
                    'success' : True,
                    'errors' : "Brak"
                })
            except FriendRequest.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'Request does not exist'
                })

        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def denyFriendRequest(request,fromusername):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            tousername = session.username
            try:
                obj = FriendRequest.objects.get(fromusername = fromusername, tousername = tousername)
                obj.delete()
                return Response({
                    'success' : True,
                    'errors' : "Brak"
                })
            except FriendRequest.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'Request does not exist'
                })

        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def removeFriend(request,username):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            fromusername = session.username
            friendlist1 = UserFriend.objects.get(username__iexact = fromusername)
            if friendlist1.isFriend(username):
                friendlist2 = UserFriend.objects.get(username__iexact = username)
                friendlist1.removeFriend(username)
                friendlist2.removeFriend(fromusername)
                return Response({
                    'success' : True,
                    'errors' : "Brak"
                })
            else:
                return Response({
                    'success' : False,
                    'errors' : 'Nie jest znajomym'
                })
        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def blockUser(request,username):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            try:
                obj = User.objects.get(username__iexact = username)
            except User.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'Użytkownik nie istnieje'
                }) 
            fromusername = session.username
            friendlist1 = UserFriend.objects.get(username__iexact = fromusername)
            if friendlist1.isFriend(username):
                return Response({
                    'success' : False,
                    'errors' : 'Usuń ze znajomych przed zablokowaniem'
                })
            
            if not friendlist1.isBlocked(username):
                friendlist1.blockUser(username)
                return Response({
                    'success' : True,
                    'errors' : "Brak"
                })
            else:
                return Response({
                    'success' : False,
                    'errors' : 'Już zablokowany'
                })
        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def unblockUser(request,username):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            fromusername = session.username
            friendlist1 = UserFriend.objects.get(username__iexact = fromusername)
            if friendlist1.isBlocked(username):
                friendlist1.unblockUser(username)
                return Response({
                    'success' : True,
                    'errors' : "Brak"
                })
            else:
                return Response({
                    'success' : False,
                    'errors' : 'Nie jest zablokowany'
                })
        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def getFriends(request):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            username = session.username
            friendlist1 = UserFriend.objects.get(username__iexact = username)
            friendlist = friendlist1.list()
            return Response({
                'success' : True,
                'errors' : "Brak",
                'friends' : friendlist
            })
        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    else:
        return Response({
            'success' : False,
            "errors" : 'serializer'
        })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def getpendingReq(request):
    serializer = FriendRequestSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                }) 
            username = session.username
            requests = FriendRequest.objects.filter(tousername = username)
            return Response({
                "success" : True,
                'errors' : "Brak",
                "requests" : serializeFriendRequest(requests)
            })
        except Session.DoesNotExist:
            return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
    return Response({
            'success' : False,
            "errors" : 'serializer'
        })