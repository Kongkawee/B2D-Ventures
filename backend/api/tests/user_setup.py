from django.contrib.auth.models import User
from ..models import Investor, Business
from datetime import datetime, timedelta


class UserSetupMixin:
    def setUp(self):
        self.business_user = User.objects.create_user(username="business_user", email="business@example.com", password="password123")
        self.investor_user = User.objects.create_user(username="investor_user", email="investor@example.com", password="password123")

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
            fundraising_purpose="Expanding operations",
            brief_description="A brief description of our business",
            goal=100000.00,
            min_investment=500.00,
            max_investment=10000.00,
            stock_amount=50.00,
            current_investment=98000,
            status="pending"
        )
