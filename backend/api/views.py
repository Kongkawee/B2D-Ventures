from rest_framewrk import generics
from .models import Investor
from .serializers import InvestorSerializer

class ListInvestor(generics.ListCreateAPIView):
    queryset = Hero.objects.all()
    serializer_class = InvestorSerializer
    
class DetailHero(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer 
    