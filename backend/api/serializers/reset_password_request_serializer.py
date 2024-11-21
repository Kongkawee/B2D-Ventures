from rest_framework import serializers

class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)