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