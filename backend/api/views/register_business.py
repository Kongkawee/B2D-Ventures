from ..models import Business
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


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
