from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Investor

@api_view(['POST'])
def register_investor(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    # Optionally create an Investor object linked to the user
    investor = Investor.objects.create(user=user, first_name=request.data.get('first_name'), last_name=request.data.get('last_name'), email=email, phone_number=request.data.get('phone_number'))
    
    refresh = RefreshToken.for_user(user)
    return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
