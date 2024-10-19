from ..serializers import InvestorSerializer
from ..models import Investor
from rest_framework import generics
from rest_framework.permissions import AllowAny


class DetailInvestor(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer 