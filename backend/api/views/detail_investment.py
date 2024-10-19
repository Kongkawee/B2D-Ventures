from ..serializers import InvestmentSerializer
from ..models import Investment
from rest_framework import generics
from rest_framework.permissions import AllowAny

class DetailInvestment(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer