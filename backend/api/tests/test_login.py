from .user_setup import UserSetupMixin
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class LoginTests(UserSetupMixin, APITestCase):
    def test_login_investor(self):
        url = reverse('investor_login')
        data = {
            "username": "investor_user",
            "password": "password123",
            "type": "investor"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["role"], "investor")

    def test_login_business(self):
        url = reverse('investor_login')
        data = {
            "username": "business_user",
            "password": "password123",
            "type": "business"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["role"], "business")
