from rest_framework import serializers

class BlockUserSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length = 30)
    reason = serializers.CharField(max_length = 200)
    expires = serializers.DateTimeField()
  