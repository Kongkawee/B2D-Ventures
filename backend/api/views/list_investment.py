from ..models import Investment
from ..serializers import InvestmentSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

class ListInvestment(generics.ListCreateAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    