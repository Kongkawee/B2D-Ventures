from ..models import Investment
from ..serializers import InvestmentSerializer
from rest_framework import generics


class InvestmentByInvestorView(generics.ListAPIView):
    serializer_class = InvestmentSerializer

    def get_queryset(self):
        investor_id = self.kwargs['pk']
        return Investment.objects.filter(investor_id=investor_id)
    