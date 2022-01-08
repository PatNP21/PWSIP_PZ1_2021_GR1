from rest_framework import serializers
from rest_framework.compat import md_filter_add_syntax_highlight
from home.models import User

class CreateCommentSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length=30)
    content = serializers.CharField(max_length=500)


    

