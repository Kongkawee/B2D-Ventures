from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..models import Investor
from ..serializers import InvestorSerializer

class UpdateInvestor(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        try:
            investor = Investor.objects.get(user=request.user)

            data = request.data
            if 'first_name' in data:
                investor.first_name = data['first_name']
            if 'last_name' in data:
                investor.last_name = data['last_name']
            if 'phone_number' in data:
                investor.phone_number = data['phone_number']
            if 'profile_picture' in request.FILES:
                investor.profile_picture = request.FILES['profile_picture']

            investor.save()

            serializer = InvestorSerializer(investor)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Investor.DoesNotExist:
            return Response({'error': 'Investor not found.'}, status=status.HTTP_404_NOT_FOUND)
