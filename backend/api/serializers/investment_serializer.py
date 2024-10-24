from rest_framework import serializers
from ..models import Investment
from .business_serializer import BusinessSerializer
from .investor_serializer import InvestorSerializer


class InvestmentSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)
    investor = InvestorSerializer(read_only=True)

    """Serializer for Investment model."""
    class Meta:
        fields = "__all__"
        model = Investment
