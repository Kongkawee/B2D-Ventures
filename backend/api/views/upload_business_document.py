from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models import Business, BusinessDocument


@api_view(['POST'])
def upload_business_documents(request, business_id):
    try:
        business = Business.objects.get(id=business_id)
    except Business.DoesNotExist:
        return Response({"error": "Business not found"}, status=status.HTTP_404_NOT_FOUND)

    # Ensure 'documents' is in the request files
    if 'documents' not in request.FILES:
        return Response({"error": "No documents provided"}, status=status.HTTP_400_BAD_REQUEST)

    documents = request.FILES.getlist('documents')

    # Save each document for the business
    for document in documents:
        BusinessDocument.objects.create(business=business, document=document, name=document.name)

    return Response({"message": "Documents uploaded successfully"}, status=status.HTTP_201_CREATED)
