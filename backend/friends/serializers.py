from rest_framework import serializers

class FriendRequestSerializer(serializers.Serializer):
    sessionid = serializers.CharField(max_length = 30)