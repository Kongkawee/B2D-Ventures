from .models import Investor, Business, Investment
from .serializers import InvestorSerializer, BusinessSerializer, InvestmentSerializer, BusinessCardSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework.exceptions import ValidationError


class IsInvestor(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'investor')
    

class IsBusiness(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'business')


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
        'access': str(refresh.access_token),
        'role': 'investor'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user_type = request.data.get('type')  # Expecting 'investor' or 'business' in the request data

    if not user_type or user_type not in ['investor', 'business']:
        return Response({'error': 'User type must be either "investor" or "business".'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is not None:
        # Check if the login request is for a business or investor
        if user_type == 'business':
            try:
                business = Business.objects.get(user=user)
                role = 'business'
            except Business.DoesNotExist:
                return Response({'error': 'Business not found'}, status=status.HTTP_404_NOT_FOUND)
        else:  # Assume it's for an investor
            try:
                investor = Investor.objects.get(user=user)
                role = 'investor'
            except Investor.DoesNotExist:
                return Response({'error': 'Investor not found'}, status=status.HTTP_404_NOT_FOUND)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'role': role
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# BUSINESS REGISTRATION
@api_view(['POST'])
@permission_classes([AllowAny])
def register_business(request):
    username = request.data.get('email')
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


        fundraise_purpose=request.data.get('fundraisePurpose'),
        brief_description=request.data.get('briefDescription'),
        pitch=request.data.get('pitch'),
        business_category=request.data.get('businessCategory'),
        country_located=request.data.get('countryLocated'),
        province_located=request.data.get('provinceLocated'),
        goal=request.data.get('goal'),
        min_investment=request.data.get('minInvestment'),
        max_investment=request.data.get('maxInvestment'),
        price_per_share=request.data.get('pricePerShare'),
    )
    business.save()

    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'role': 'business'
    }, status=status.HTTP_201_CREATED)

# INVESTMENT HANDLING
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invest(request):
    try:
        investor = Investor.objects.get(user=request.user)
        investor_id = investor.id
    except Investor.DoesNotExist:
        return Response({'error': 'Investor not found.'}, status=status.HTTP_404_NOT_FOUND)

    business_id = request.data.get('business_id')
    amount = request.data.get('amount')
    shares = request.data.get('shares')

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
        amount=amount,
        shares=shares
    )

    investment_serializer = InvestmentSerializer(investment)
    return Response(investment_serializer.data, status=status.HTTP_201_CREATED)


class ListInvestor(generics.ListCreateAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer
    

class DetailInvestor(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer 


class ListBusiness(generics.ListCreateAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer


class ListAvailableBusinessForCard(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Business.objects.filter(status="available")
    serializer_class = BusinessCardSerializer
    

class DetailBusiness(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer 


class ListInvestment(generics.ListCreateAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    

class DetailInvestment(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny] # Remove after tested
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer 


class CurrentInvestorProfile(generics.RetrieveUpdateAPIView):
    serializer_class = InvestorSerializer
    permission_classes = [IsAuthenticated, IsInvestor]

    def get_object(self):
        user = self.request.user
        return Investor.objects.get(user=user)
    

class CurrentInvestorInvestment(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated, IsInvestor]

    def get_queryset(self):
        investor = Investor.objects.get(user=self.request.user)
        return Investment.objects.filter(investor=investor)
    

class CurrentBusinessFundraise(generics.ListAPIView):
    serializer_class = InvestmentSerializer
    permission_classes = [IsAuthenticated, IsBusiness]

    def get_queryset(self):
        business = Business.objects.get(user=self.request.user)
        return Investment.objects.filter(business=business)

class CurrentBusinessProfile(generics.RetrieveUpdateAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [IsAuthenticated, IsBusiness]

    def get_object(self):
        user = self.request.user
        return Business.objects.get(user=user)


class InvestmentByInvestorView(generics.ListAPIView):
    serializer_class = InvestmentSerializer

    def get_queryset(self):
        investor_id = self.kwargs['pk']
        return Investment.objects.filter(investor_id=investor_id)
