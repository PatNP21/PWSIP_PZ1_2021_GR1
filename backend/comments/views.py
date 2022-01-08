from comments.serializers import CreateCommentSerializer
from login.serializers import IsLoggedInSerializer
from home.models import User, Session
from posts.models import Post
from comments.models import Comment
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
# Create your views here.
@api_view(['POST'])
@renderer_classes([JSONRenderer])
def createComment(request,idpost):
    serializer = CreateCommentSerializer(data = request.data)
    if serializer.is_valid():
        sessionid = serializer.data["sessionid"]
        session = Session.objects.get(sessionid=sessionid)
        if session.isexpired():
            return Response({
                'success' : False,
                'errors' : 'Not logged in'
            })
        try:
            post = Post.objects.get(id = idpost)
        except Post.DoesNotExist:
            return Response({
                'success' : False,
                'errors' : 'Post does not exist'
            })
        author = session.username    
        content = serializer.data["content"]
        publicationdate = timezone.now()
        Comment.objects.create(
            author = author,
            content = content,
            publicationdate = publicationdate,
            post = post
        )
        return Response({
            'success': True
        })
    else:
        return Response({
            'success': False,
            'errors' : 'Zjebałeś wysyłkę znowu'
        })