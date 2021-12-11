from rest_framework import serializers
from home.models import User

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password'
        ]

class IsLoggedInSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length = 30)


