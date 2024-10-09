from django.db import models
from django.contrib.auth.models import AbstractUser


class Investor(models.Model):
    """Investor Model represents the investor, containing their name and contacts."""
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(blank=False, null=False, unique=True)
    phone_number = models.CharField(max_length=10, blank=False, null=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Business(models.Model):
    """Business Model represents the business, containing their company and business details"""
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    company_name = models.CharField(max_length=100)
    business_name = models.CharField(max_length=80)
    email = models.EmailField(blank=False, null=False)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    publish_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField()
    goal = models.DecimalField(max_digits=4, decimal_places=2)
    min_investment = models.DecimalField(max_digits=4, decimal_places=2)
    max_investment = models.DecimalField(max_digits=4, decimal_places=2)
    current_investment = models.DecimalField(max_digits=4, decimal_places=2)
    shares_detail = models.CharField(max_length=100)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.company_name + ': ' + {self.business_name}}"



class Investment(models.Model):
    """Investment Model represents the investment, containing the information of the investor and business."""
    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    shares = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.investor} invested {self.amount} baht in {self.business}, gaining {self.shares} of share."
