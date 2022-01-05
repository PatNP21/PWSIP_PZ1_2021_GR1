from rest_framework import serializers
from rest_framework.fields import empty
from posts.serializers import CreatePostSerializer
from login.serializers import IsLoggedInSerializer
from home.models import User, Session
from posts.models import Post
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes

# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def createpost(request):
    serializer = CreatePostSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data["sessionid"]
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'loggedin':False
                })
            author = session.username    
            title = serializer.data["title"]
            content = serializer.data["content"]
            publicationdate = timezone.now()
            Post.objects.create(
                author = author,
                title = title,
                content = content,
                images = '',
                publicationdate = publicationdate,
                visibility = True,
                likeList = '',
                likeCounter = 0,
                
            )
            return Response({
                'errors':'Brak'
            })
            

        except Session.DoesNotExist:
            return Response({
                "errors":"User isn't logged in"
            })
    else:
        return Response({
                "errors":"Zjebałeś wysłanie popraw sie kmiotku"
            })

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def getpost(request,idpost):
    try:
        post = Post.objects.get(id = idpost)
        return Response({
            'author' : post.author,
            'title' : post.title,
            'content': post.content,
            'publicationdate' : post.publicationdate,
            'likecounter': post.likeCounter
        })
    except Post.DoesNotExist:
        return Response({
            "errors":"Post doesn't exist"
        })
@api_view(['GET'])
@renderer_classes([JSONRenderer])
def getUserPosts(request,author):
    queryposts = Post.objects.filter(author = author, visibility = True)
    posts = []
    for post in queryposts:
        p = {
        'author' : post.author,
        'title' : post.title,
        'content': post.content,
        'publicationdate' : post.publicationdate
        }
        posts.append(p)
    return Response({
        'author' : author,
        'posts' : posts
    })

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def getSelfPosts(request):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        sessionid = serializer.data["sessionid"]
        try:
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'loggedin':False
                })
            author = session.username
            queryposts = Post.objects.filter(author = author)
            posts = []
            for post in queryposts:
                p = {
                'author' : post.author,
                'title' : post.title,
                'content': post.content,
                'publicationdate' : post.publicationdate
                }
                posts.append(p)
            return Response({
                'author' : author,
                'posts' : posts
            })
        except Session.DoesNotExist:
                return Response({
                    "errors":"User isn't logged in"
                })
    else:
        return Response({
            'error': 'KURWA, to nie działa'
        })
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def deletePost(request,idpost):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        sessionid = serializer.data["sessionid"]
        try:
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'loggedin':False
                })
            user = session.username
            post = Post.objects.get(id = idpost)
            author = post.author
            if(user == author):
                post.delete()
                return Response({
                    'success' : True
                })
            else: 
                return Response({
                        'success' : False,
                        'errors' : 'User is not an owner of this post'
                    })

        except Session.DoesNotExist:
                return Response({
                    "errors":"User isn't logged in"
                })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def likePost(request,idpost):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        sessionid = serializer.data["sessionid"]
        try:
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'loggedin':False
                })
            
            post = Post.objects.get(id = idpost)
            username = session.username
            if(post.isLiked(username)):
                post.removeLike(username)
            
            else:            
                post.addLike(username)
            
            return Response({
                "success": True
            })

        except Session.DoesNotExist:
                return Response({
                    "errors":"User isn't logged in"
                })


        