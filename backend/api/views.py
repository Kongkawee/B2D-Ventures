from .models import Investor, Business, Investment
from .serializers import InvestorSerializer, BusinessSerializer, InvestmentSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import ValidationError

# INVESTOR REGISTRATION
@api_view(['POST'])
@permission_classes([AllowAny])
def register_investor(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Validation: Ensure username is unique
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    # Create the associated investor object
    investor = Investor.objects.create(
        user=user, 
        first_name=request.data.get('firstName'), 
        last_name=request.data.get('lastName'), 
        email=email, 
        phone_number=request.data.get('phoneNumber')
    )
    investor.save()

    # Generate and return JWT tokens
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh), 
        'access': str(refresh.access_token)
    }, status=status.HTTP_201_CREATED)

# INVESTOR LOGIN
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

# BUSINESS REGISTRATION
@api_view(['POST'])
@permission_classes([AllowAny])
def register_business(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    business = Business.objects.create(
        user=user,
        company_name=request.data.get('companyName'),
        business_name=request.data.get('businessName'),
        email=email,
        phone_number=request.data.get('phoneNumber'),
        publish_date=request.data.get('publishDate'),
        end_date=request.data.get('endDate'),
        description=request.data.get('description'),
        goal=request.data.get('goal'),
        min_investment=request.data.get('minInvestment'),
        max_investment=request.data.get('maxInvestment'),
        current_investment=request.data.get('currentInvestment'),
        shares_detail=request.data.get('sharesDetail'),
        status=request.data.get('status')
    )

    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }, status=status.HTTP_201_CREATED)

# BUSINESS LOGIN
@api_view(['POST'])
@permission_classes([AllowAny])
def login_business(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        try:
            business = Business.objects.get(user=user)
        except Business.DoesNotExist:
            return Response({'error': 'Business not found'}, status=status.HTTP_404_NOT_FOUND)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# INVESTMENT HANDLING
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invest(request):
    investor_id = request.data.get('investor_id')
    business_id = request.data.get('business_id')
    amount = request.data.get('amount')

    if not investor_id or not business_id or not amount:
        return Response({'error': 'Missing required fields.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        investor = Investor.objects.get(id=investor_id)
    except Investor.DoesNotExist:
        return Response({'error': 'Investor not found.'}, status=status.HTTP_404_NOT_FOUND)

    try:
        business = Business.objects.get(id=business_id)
    except Business.DoesNotExist:
        return Response({'error': 'Business not found.'}, status=status.HTTP_404_NOT_FOUND)

    if amount <= 0:
        return Response({'error': 'Investment amount must be positive.'}, status=status.HTTP_400_BAD_REQUEST)

    if amount < business.min_investment or amount > business.max_investment:
        return Response({'error': f'Investment must be between {business.min_investment} and {business.max_investment}.'}, status=status.HTTP_400_BAD_REQUEST)

    if business.current_investment + amount > business.goal:
        return Response({'error': 'Investment exceeds the business goal.'}, status=status.HTTP_400_BAD_REQUEST)

    business.current_investment += amount
    business.save()

    investment = Investment.objects.create(
        investor=investor,
        business=business,
        amount=amount
    )

    investment_serializer = InvestmentSerializer(investment)
    return Response(investment_serializer.data, status=status.HTTP_201_CREATED)


class ListInvestor(generics.ListCreateAPIView):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
    

class DetailInvestor(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
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
    serializer_class = InvestmentSerializer 


class CurrentInvestorProfile(generics.RetrieveUpdateAPIView):
    serializer_class = InvestorSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return Investor.objects.get(user=user)
    
class CurrentInvestorInvestment(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        investor = Investor.objects.get(user=self.request.user)
        return Investment.objects.filter(investor=investor)
    

class InvestmentByInvestorView(generics.ListAPIView):
    serializer_class = InvestmentSerializer

    def get_queryset(self):
        investor_id = self.kwargs['pk']
        return Investment.objects.filter(investor_id=investor_id)
