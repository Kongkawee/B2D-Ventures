from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Business, BusinessImage


@api_view(['POST'])
def upload_business_images(request, business_id):
    business = Business.objects.get(id=business_id)

    # Ensure 'images' is in the request files
    if 'images' not in request.FILES:
        return Response({"error": "No images provided"}, status=status.HTTP_400_BAD_REQUEST)

    images = request.FILES.getlist('images')

    # Save each image for the business
    for image in images:
        BusinessImage.objects.create(business=business, image=image)

    return Response({"message": "Images uploaded successfully"}, status=status.HTTP_201_CREATED)
