from rest_framework import serializers
from .models import Investor, Investment, Business


class InvestorSerializer(serializers.ModelSerializer):
    """Serializer for Investor model."""
    class Meta:
        fields = "__all__"
        model = Investor


class BusinessSerializer(serializers.ModelSerializer):
    """Serializer for Business model."""
    class Meta:
        fields = "__all__"
        model = Business


class InvestmentSerializer(serializers.ModelSerializer):
    business = BusinessSerializer(read_only=True)
    investor = InvestorSerializer(read_only=True)

    """Serializer for Investment model."""
    class Meta:
        fields = "__all__"
        model = Investment
