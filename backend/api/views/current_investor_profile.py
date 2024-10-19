from ..serializers import InvestorSerializer
from .is_investor import IsInvestor
from ..models import Investor
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class CurrentInvestorProfile(generics.RetrieveUpdateAPIView):
    serializer_class = InvestorSerializer
    permission_classes = [IsAuthenticated, IsInvestor]

    def get_object(self):
        user = self.request.user
        return Investor.objects.get(user=user)