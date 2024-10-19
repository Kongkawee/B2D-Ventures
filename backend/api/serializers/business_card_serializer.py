from rest_framework import serializers
from ..models import Business


class BusinessCardSerializer(serializers.ModelSerializer):
    """Serializer for Business card visualize."""
    class Meta:
        fields = ["id", "business_name", "company_name", "business_category", "brief_description", "country_located", "province_located"]
        model = Business
        