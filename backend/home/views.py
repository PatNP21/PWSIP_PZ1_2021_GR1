from django.db.models.query import QuerySet
from home.models import User
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view, renderer_classes
# Create your views here.

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def RegisteredUserCount(request):
    users = User.objects.all().count()
    print(users)
    return Response({
        "count": users
    })
    

    