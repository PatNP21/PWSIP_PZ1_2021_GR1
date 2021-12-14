from rest_framework import serializers
from home.models import User

class DataChangeSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length=30)
    email = serializers.CharField(max_lenght=100)
    firstname = serializers.CharField(max_lenght=30)
    lastname = serializers.CharField(max_lenght=30)
    DOB = serializers.DateField()

