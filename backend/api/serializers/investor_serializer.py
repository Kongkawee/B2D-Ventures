from rest_framework import serializers
from ..models import Investor

class InvestorSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Investor
        fields = ['id', 'user', 'first_name', 'last_name', 'email', 'phone_number', 'profile_picture', 'uid']
        read_only_fields = ['id', 'user']
