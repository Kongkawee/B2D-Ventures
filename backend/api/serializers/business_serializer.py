from rest_framework import serializers
from ..models import Business


class BusinessSerializer(serializers.ModelSerializer):
    """Serializer for Business model."""
    class Meta:
        fields = "__all__"
        model = Business
        