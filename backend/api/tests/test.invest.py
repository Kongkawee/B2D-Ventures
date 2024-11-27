from .user_setup import UserSetupMixin
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class InvestTests(UserSetupMixin, APITestCase):
    def setUp(self):
        super().setUp()
        self.investor_token = str(RefreshToken.for_user(self.investor_user).access_token)

    def test_invest(self):
        url = reverse('invest')
        data = {
            "business_id": self.business.id,
            "amount": 1000,
            "shares": 20
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.investor_token}')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(float(response.data['amount']), 1000)
        self.assertEqual(float(response.data['shares']), 20)
        
    def test_invest_lt_min(self):
        url = reverse('invest')
        data = {
            "business_id": self.business.id,
            "amount": 100,
            "shares": 20
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.investor_token}')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_invest_gt_max(self):
        url = reverse('invest')
        data = {
            "business_id": self.business.id,
            "amount": 20000,
            "shares": 20
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.investor_token}')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_invest_exceed_goal(self):
        url = reverse('invest')
        data = {
            "business_id": self.business.id,
            "amount": 3000,
            "shares": 20
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.investor_token}')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)