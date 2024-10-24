from ..serializers import InvestmentSerializer
from ..models import Business, Investor, Investment
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status



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