from rest_framework import serializers
from rest_framework.fields import empty
from posts.serializers import CreatePostSerializer
from login.serializers import IsLoggedInSerializer
from home.models import User, Session
from posts.models import Post
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes, parser_classes
from drawit.settings import BASE_DIR
from scripts.saveFile import saveFile
from scripts.serializePosts import serializePosts
api_url = 'http://localhost:8000/media/'
# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
@parser_classes([MultiPartParser])
def createpost(request):
    serializer = CreatePostSerializer(data = request.data)
    if serializer.is_valid():
        try:
            sessionid = serializer.data["sessionid"]
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'loggedin':False
                })
            author = session.username    
            title = serializer.data["title"]
            content = serializer.data["content"]
            publicationdate = timezone.now()
            images = ''
            if 'image' in request.FILES:
                print("SENT")
                images = api_url+saveFile(request.FILES['image'])
            else:
                print("NOT SENT")

            Post.objects.create(
                author = author,
                title = title,
                content = content,
                images = images,
                publicationdate = publicationdate,
                visibility = True,
                likeList = '',
                likeCounter = 0,
                
            )
            return Response({
                'success' : True,
                'errors':'Brak'
            })
            

        except Session.DoesNotExist:
            return Response({
                'success' : False,
                "errors":"User isn't logged in"
            })
    else:
        return Response({
                'success' : False,
                "errors":"Zjebałeś wysłanie popraw sie kmiotku"
            })

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def getpost(request,idpost):
    try:
        post = Post.objects.get(id = idpost)
        return Response({
            'success' : True,
            'author' : post.author,
            'title' : post.title,
            'content': post.content,
            'image' : post.images,
            'publicationdate' : post.publicationdate,
            'likecounter': post.likeCounter
        })
    except Post.DoesNotExist:
        return Response({
            'success' : False,
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
        'image' : post.images,
        'publicationdate' : post.publicationdate,
        'likecounter': post.likeCounter
        }
        posts.append(p)
    return Response({
        'success' : True,
        'author' : author,
        'posts' : posts
    })

@api_view(['POST'])
@renderer_classes([JSONRenderer])
def getSelfPosts(request):
    serializer = IsLoggedInSerializer(data = request.data)
    if serializer.is_valid():
        sessionid = serializer.data["sessionid"]
        try:
            session = Session.objects.get(sessionid=sessionid)
            if session.isexpired():
                return Response({
                    'success' : False,
                    'loggedin':False
                })
            author = session.username
            queryposts = Post.objects.filter(author = author)
            posts = []
            for post in queryposts:
                p = {
                'id' : post.id,
                'author' : post.author,
                'title' : post.title,
                'content': post.content,
                'image' : post.images,
                'publicationdate' : post.publicationdate,
                'likecounter': post.likeCounter
                }
                posts.append(p)
            return Response({
                'success' : True,
                'author' : author,
                'posts' : posts
            })
        except Session.DoesNotExist:
                return Response({
                    'success' : False,
                    "errors":"User isn't logged in"
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
                    'success' : False,
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
                    'success' : False,
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
                    'success' : False,
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
                    'success' : False,
                    "errors":"User isn't logged in"
                })
    else:   return Response({
                    'success' : False,
                    "errors":"Serializer error"
                })
per_page = 15
@api_view(['GET'])
@renderer_classes([JSONRenderer])
def getPosts(request,page):
    if(page < 1):
        return Response({
            'success' : False,
            "errors":"Ty sie dobrze czujesz?"
            })
    records =  page * per_page
    posts = Post.objects.filter(visibility = True).order_by('-publicationdate')
    if posts.count()-(records - per_page) <= 0:
         return Response({
            'success' : False,
            "errors":"Posty sie skonczyly typie"
            })
    more = True
    if posts.count() > records:
        posts = posts[records- per_page:records]
    else:
        posts = posts[records- per_page:]
        more = False
    return Response({
            'success' : True,
            'page' : page,
            'count' : posts.count(),
            'posts' : serializePosts(posts),
            'more' : more
        })
@api_view(['GET'])
@renderer_classes([JSONRenderer])
def getLikes(request,idpost):
    try:
        post = Post.objects.get(id = idpost)
        return Response({
            'success' : True,
            'likecounter' : post.likeCounter
        })
    except Post.DoesNotExist:
        return Response({
            'success' : False,
            'errors' : "Post does not exist"
        })