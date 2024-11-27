from .user_setup import UserSetupMixin
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class ProfileTests(UserSetupMixin, APITestCase):
    def setUp(self):
        super().setUp()
        self.investor_token = str(RefreshToken.for_user(self.investor_user).access_token)
        self.business_token = str(RefreshToken.for_user(self.business_user).access_token)

    def test_current_investor_profile(self):
        url = reverse('current_investor_profile')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.investor_token}')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.investor.email)

    def test_current_business_profile(self):
        url = reverse('current_business_profile')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.business_token}')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.business.email)
