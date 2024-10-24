from ..models import Investor
from ..serializers import InvestorSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class ListInvestor(generics.ListCreateAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer