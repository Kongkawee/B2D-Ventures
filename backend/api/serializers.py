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
    """Serializer for Investment model."""
    class Meta:
        fields = "__all__"
        model = Investment
