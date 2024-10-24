from ..serializers import BusinessSerializer
from .is_business import IsBusiness
from ..models import Business
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class CurrentBusinessProfile(generics.RetrieveUpdateAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [IsAuthenticated, IsBusiness]

    def get_object(self):
        user = self.request.user
        return Business.objects.get(user=user)