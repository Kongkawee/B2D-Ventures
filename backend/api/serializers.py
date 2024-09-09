from rest_framework import serializers
from .models import Investor, Investment, Business


class InvestorSerializer(serializers.ModelSerializer):
    """Serializer for Investor model."""
    class Meta:
        fields = "__all__"
        model = Investor
        