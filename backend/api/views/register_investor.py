# views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Investor


@api_view(['POST'])
@permission_classes([AllowAny])
def register_investor(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('firstName')
    last_name = request.data.get('lastName')
    phone_number = request.data.get('phoneNumber')
    profile_picture = request.FILES.get('profile_picture')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name, last_name=last_name)
    user.save()

    investor = Investor.objects.create(
        user=user,
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone_number,
        profile_picture=profile_picture
    )
    investor.save()

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'role': 'investor'
    }, status=status.HTTP_201_CREATED)
