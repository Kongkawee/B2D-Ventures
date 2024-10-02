from .models import Investor, Business, Investment
from .serializers import InvestorSerializer, BusinessSerializer, InvestmentSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Investor
from rest_framework.permissions import AllowAny


@api_view(['POST'])
@permission_classes([AllowAny])
def register_investor(request):
    username = request.data.get('username')  # You need to ensure username is passed from the client
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    # Create the Investor object linked to the User
    investor = Investor.objects.create(
        user=user, 
        first_name=request.data.get('firstName'), 
        last_name=request.data.get('lastName'), 
        email=email, 
        phone_number=request.data.get('phoneNumber')
    )

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh), 
        'access': str(refresh.access_token)
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_investor(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    
class ListInvestor(generics.ListCreateAPIView):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
    

class DetailInvestor(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer 


class ListBusiness(generics.ListCreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    

class DetailBusiness(generics.RetrieveUpdateDestroyAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer 


class ListInvestment(generics.ListCreateAPIView):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    

class DetailInvestment(generics.RetrieveUpdateDestroyAPIView):
    queryset = Investment.objects.all()
    serializer_class = BusinessSerializer 


