from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.exceptions import ValidationError
from ..models import Business, BusinessImage, BusinessDocument
import json



@api_view(['POST'])
@permission_classes([AllowAny])
def register_business(request):
    username = request.data.get('email')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)

    pitch_json = request.POST.getlist('pitch')[0]
    pitch_data = json.loads(pitch_json)
    pitch_list = list(pitch_data.values())

    # Create the business object
    business = Business.objects.create(
        user=user,
        company_name=request.data.get('companyName'),
        business_name=request.data.get('businessName'),
        email=email,
        phone_number=request.data.get('phoneNumber'),
        publish_date=request.data.get('publishDate'),
        end_date=request.data.get('endDate'),
        fundraising_purpose=request.data.get('fundraisingPurpose'),
        brief_description=request.data.get('briefDescription'),
        pitch=pitch_list,
        business_category = request.POST.getlist('businessCategory'),
        country_located=request.data.get('countryLocated'),
        city_located=request.data.get('cityLocated'),
        goal=request.data.get('goal'),
        min_investment=request.data.get('minInvestment'),
        max_investment=request.data.get('maxInvestment'),
        stock_amount=request.data.get('stockAmount'),
    )

    if 'coverImage' in request.FILES:
        business.cover_image = request.FILES['coverImage']

    if 'describeImages' in request.FILES:
        for image in request.FILES.getlist('describeImages'):
            BusinessImage.objects.create(business=business, image=image)
            
    if 'businessDocuments' in request.FILES:
        document_names = request.POST.getlist('documentNames')

        for index, file in enumerate(request.FILES.getlist('businessDocuments')):
            name = document_names[index] if index < len(document_names) else file.name
            BusinessDocument.objects.create(business=business, document=file, name=name)

        
    
    try:
        user.save()
        business.full_clean()
        business.save()
    except ValidationError as e:
        print("Investor validation failed:", e)
        user.delete()
        print("User instance deleted due to investor validation failure.")

    # Generate and return JWT tokens
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'role': 'business'
    }, status=status.HTTP_201_CREATED)
