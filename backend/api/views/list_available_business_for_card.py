from ..models import Business
from ..serializers import BusinessSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

class ListAvailableBusinessForCard(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Business.objects.filter(status="available")
    serializer_class = BusinessSerializer
