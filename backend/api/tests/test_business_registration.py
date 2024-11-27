from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from datetime import datetime, timedelta

class BusinessRegistrationTests(APITestCase):
    def test_register_business(self):
        url = reverse('business_register')
        data = {
            "email": "new_business@example.com",
            "password": "newpassword123",
            "companyName": "New Company",
            "businessName": "New Business",
            "phoneNumber": "0987654321",
            "publishDate": datetime.now().isoformat(),
            "endDate": (datetime.now() + timedelta(days=10)).isoformat(),
            "fundraisingPurpose": "Raise funds for expansion",
            "briefDescription": "Brief description",
            "goal": 100000.00,
            "minInvestment": 500.00,
            "maxInvestment": 10000.00,
            "stockAmount": 50.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
