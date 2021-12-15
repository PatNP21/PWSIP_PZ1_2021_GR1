from rest_framework import serializers

class DataChangeSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=100,allow_blank = True)
    firstname = serializers.CharField(max_length=30, allow_blank = True)
    lastname = serializers.CharField(max_length=30, allow_blank = True)
    DOB = serializers.DateField(allow_null = True)

