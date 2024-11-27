from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class InvestorRegistrationTests(APITestCase):
    def test_register_investor(self):
        url = reverse('investor_register')
        data = {
            "username": "new_investor",
            "email": "new_investor@example.com",
            "password": "newpassword123",
            "firstName": "New",
            "lastName": "Investor",
            "phoneNumber": "1234567890"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
