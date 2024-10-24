from rest_framework import serializers
from ..models import BusinessImage


class BusinessImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessImage
        fields = ['id', 'image']
