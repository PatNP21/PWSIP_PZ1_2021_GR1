
from rest_framework import serializers
from posts.serializers import CreatePostSerializer
from home.models import User, Session
from posts.models import Post
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes

# Create your views here.
@api_view(["POST"])
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
                publicationdate = publicationdate
            )
            return Response({
                'errors':'Brak'
            })
            

        except Session.DoesNotExist:
            return Response({
                "errors":"User isn't logged in"
            })