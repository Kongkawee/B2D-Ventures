from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Investment
from .user_setup import UserSetupMixin
from rest_framework_simplejwt.tokens import RefreshToken

class InvestmentListTests(UserSetupMixin, APITestCase):
    def setUp(self):
        super().setUp()
        self.investor_token = str(RefreshToken.for_user(self.investor_user).access_token)
        self.business_token = str(RefreshToken.for_user(self.business_user).access_token)
        self.investment = Investment.objects.create(
            investor=self.investor,
            business=self.business,
            amount=1000,
            shares=20
        )

    def test_list_investments_by_investor(self):
        url = reverse('current_investor_investment')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.investor_token}')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_list_investments_by_business(self):
        url = reverse('current_business_fundraise')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.business_token}')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
