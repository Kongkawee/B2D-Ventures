from ..models import Investor
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny


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
