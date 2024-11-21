from rest_framework import generics, status
from rest_framework.response import Response
from ..serializers import ResetPasswordSerializer
from ..models import PasswordReset, Investor, Business
from datetime import datetime


class ResetPassword(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = []

    def post(self, request, token):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        new_password = data['new_password']
        confirm_password = data['confirm_password']

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        reset_obj = PasswordReset.objects.filter(token=token).first()

        if not reset_obj:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        investor = Investor.objects.filter(email=reset_obj.email).first()
        business = Business.objects.filter(email=reset_obj.email).first()

        if investor:
            user = investor.user
        elif business:
            user = business.user
        else:
            return Response({'error': 'No user found'}, status=status.HTTP_404_NOT_FOUND)
        
        if reset_obj.used:
            return Response({'error': 'This token has been used'}, status=status.HTTP_404_NOT_FOUND)
        
        #if datetime.now() > reset_obj.expire_date:
        #    return Response({'error': 'This token has been expired'}, status=status.HTTP_404_NOT_FOUND)


        user.set_password(new_password)
        user.save()

        reset_obj.used = True
        reset_obj.save()

        return Response({'success': 'Password updated successfully'}, status=status.HTTP_200_OK)
