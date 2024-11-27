from rest_framework import serializers
from ..models import BusinessDocument


class BusinessDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessDocument
        fields = '__all__'