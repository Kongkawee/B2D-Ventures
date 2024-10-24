from ..models import Investor, Business
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

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