from ..serializers import InvestmentSerializer
from .is_investor import IsInvestor
from ..models import Investor, Investment
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CurrentInvestorInvestment(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated, IsInvestor]

    def get_queryset(self):
        investor = Investor.objects.get(user=self.request.user)
        return Investment.objects.filter(investor=investor)