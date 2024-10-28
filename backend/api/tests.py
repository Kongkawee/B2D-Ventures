from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Investor, Business, Investment
from datetime import datetime, timedelta
from rest_framework_simplejwt.tokens import RefreshToken

class UserSetupMixin:
    def setUp(self):
        # Create a business user
        self.business_user = User.objects.create_user(username="business_user", email="business@example.com", password="password123")
        self.investor_user = User.objects.create_user(username="investor_user", email="investor@example.com", password="password123")
        
        # Create an investor and business instance
        self.investor = Investor.objects.create(
            user=self.investor_user,
            first_name="John",
            last_name="Doe",
            email="investor@example.com",
            phone_number="1234567890"
        )
        
        self.business = Business.objects.create(
            user=self.business_user,
            company_name="Test Company",
            business_name="Test Business",
            email="business@example.com",
            phone_number="0987654321",
            publish_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            fundraise_purpose="Expanding operations",
            brief_description="A brief description of our business",
            goal=100000.00,
            min_investment=500.00,
            max_investment=10000.00,
            price_per_share=50.00,
            current_investment=98000,
            status="pending"
        )
