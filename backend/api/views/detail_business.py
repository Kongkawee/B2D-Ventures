from ..serializers import BusinessSerializer
from ..models import Business
from rest_framework import generics
from rest_framework.permissions import AllowAny

class DetailBusiness(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer 