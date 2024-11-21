from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from ..models import Investor, Business, PasswordReset
from ..serializers import ResetPasswordRequestSerializer
from os import getenv


class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        investor = Investor.objects.filter(email__iexact=email).first()
        business = Business.objects.filter(email__iexact=email).first()

        user = None
        if investor:
            user = investor.user
        elif business:
            user = business.user

        if user:
            # Generate a token and save it in the PasswordReset model
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            reset = PasswordReset(email=email, token=token)
            reset.save()

            # Construct the reset URL
            reset_url = f"{getenv('PASSWORD_RESET_BASE_URL')}/{token}/"

            # Send reset email
            try:
                email = EmailMessage(
                    subject="Password Reset Request",
                    body=f"Hello,\n\nYou requested a password reset. Click the link below to reset your password:\n{reset_url}\n\nIf you did not make this request, you can ignore this email.",
                    from_email=getenv("DEFAULT_FROM_EMAIL"),
                    to=[email],
                )
                email.send(fail_silently=False)
                print("Email sent successfully!")
            except Exception as e:
                return Response({"error": "Failed to send email. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User with provided email not found"}, status=status.HTTP_404_NOT_FOUND)
