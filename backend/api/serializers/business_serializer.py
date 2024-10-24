from rest_framework import serializers
from ..models import Business
from .business_image_serializer import BusinessImageSerializer


class BusinessSerializer(serializers.ModelSerializer):
    """Serializer for Business model."""
    describe_images = BusinessImageSerializer(many=True, read_only=True)

    class Meta:
        fields = "__all__"
        model = Business
        