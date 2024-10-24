from ..serializers import InvestmentSerializer
from ..models import Business, Investment
from .is_business import IsBusiness
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CurrentBusinessFundraise(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated, IsBusiness]

    def get_queryset(self):
        business = Business.objects.get(user=self.request.user)
        return Investment.objects.filter(business=business)