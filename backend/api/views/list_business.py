from ..models import Business
from ..serializers import BusinessSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class ListBusiness(generics.ListCreateAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    