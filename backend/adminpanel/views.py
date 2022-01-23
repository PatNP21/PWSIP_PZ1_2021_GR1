from rest_framework import serializers
from adminpanel.serializers import BlockUserSerializer
from login.serializers import IsLoggedInSerializer
from home.models import User, Session, BlockedUser
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
from posts.models import Post
from comments.models import Comment

# Create your views here.

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def BlockUser(request,username): 
    serializer = BlockUserSerializer(data = request.data) 
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
            admin = User.objects.get(username__iexact = session.username)
            if(admin.privileges == "Admin"):
                user = User.objects.get(username = username)
                BlockedUser.objects.create(user = user, reason = serializer.data['reason'], expires = serializer.data['expires'])
                return Response({
                    'success': True,
                    'errors':'Brak',
                    'Info':'Uzytkownik: ' + username +' otrzymał banicję do ' + serializer.data['expires'] +', powod: '+ serializer.data['reason']
                })
            else:
                return Response({
                    'success': False,
                    'errors':'Nie masz uprawnien'
                })    
        except User.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'User does not exist'
                })        
    return Response({
        "errors":"brak"
    })
    
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def UnblockUser(request,username):
    serializer = IsLoggedInSerializer(data = request.data) 
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
            admin = User.objects.get(username__iexact = session.username)
            if(admin.privileges == "Admin"):
                user = User.objects.get(username = username)
                try:
                    obj = BlockedUser.objects.get(user=user)
                    obj.delete()               
                    return Response({
                        'success': True,
                        'errors':'Brak',
                        'Info':'Uzytkownik: ' + username +' zostal odbanowany'
                    })
                except BlockedUser.DoesNotExist:
                    return Response({
                        'success':False,
                        'errors':"User wasn't banned"
                    })
            else:
                return Response({
                    'success': False,
                    'errors':'Nie masz uprawnien'
                })    
        except User.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'User does not exist'
                })        
    return Response({
        "errors":"brak"
    })

        
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def DeletePost(request,idpost):
    serializer = IsLoggedInSerializer(data = request.data) 
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
            admin = User.objects.get(username__iexact = session.username)
            if(admin.privileges == "Admin"):
                try:
                    post = Post.objects.get(id=idpost)
                    post.delete()

                    return Response({
                        'success': True,
                        'errors':'brak'
                    })
                except Post.DoesNotExist:
                    return Response({
                        'success': False,
                        'errors':'Post nie istnieje'
                    })

            else:
                return Response({
                    'success': False,
                    'errors':'Nie masz uprawnien'
                })    
        except User.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'User does not exist'
                })        
    return Response({
        "errors":"brak"
    })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def DeleteComment(request,idcomment):
    serializer = IsLoggedInSerializer(data = request.data) 
    if serializer.is_valid():
        try:
            sessionid = serializer.data['sessionid']
            session = Session.objects.get(sessionid = sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'errors' : 'Niezalogowany'
                })
            admin = User.objects.get(username__iexact = session.username)
            if(admin.privileges == "Admin"):
                try:
                    comment = Comment.objects.get(id = idcomment)
                    comment.delete()

                    return Response({
                        'success': True,
                        'errors':'brak'
                    })
                except Comment.DoesNotExist:
                    return Response({
                        'success': False,
                        'errors':'Post nie istnieje'
                    })

            else:
                return Response({
                    'success': False,
                    'errors':'Nie masz uprawnien'
                })    
        except User.DoesNotExist:
                return Response({
                    'success' : False,
                    'errors' : 'User does not exist'
                })        
    return Response({
        "errors":"brak"
    })

