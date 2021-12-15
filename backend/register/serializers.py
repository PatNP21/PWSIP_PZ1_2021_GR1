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
            'dateofbirth'
        ]

class ChangePasswordSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length = 30)
    oldpass = serializers.CharField(max_length = 30)
    newpass = serializers.CharField(max_length = 30)

class ActivateAccSerializer(serializers.Serializer):
    code = serializers.CharField(max_length = 30)

class PasswordRecoverySerializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
class RecoverSerializer(serializers.Serializer):
    code = serializers.CharField(max_length = 30)
    newpass = serializers.CharField(max_length = 30)