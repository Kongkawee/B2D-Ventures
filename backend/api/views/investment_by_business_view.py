from ..models import Investment
from ..serializers import InvestmentSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class InvestmentByBusinessView(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [AllowAny] # Remove after tested


    def get_queryset(self):
        business_id = self.kwargs['business_id']
        return Investment.objects.filter(business_id=business_id)
