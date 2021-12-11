from rest_framework import serializers
from home.models import User

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'email',
            'firstname',
            'lastname',
            'DOB'
        ]
        
class ChangePasswordSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length = 30)
    oldpass = serializers.CharField(max_length = 30)
    newpass = serializers.CharField(max_length = 30)