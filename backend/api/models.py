from django.db import models

class Investor(models.Model):
    """Investor Model represents the investor, containing their name and contacts."""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=False, null=False)
    phone_number = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name + ' ' + self.last_name}"

class Business(models.Model):
    """Business Model represents the business, containing their company and business details"""
    compnay_name = models.CharField(max_length=100)
    business_name = models.CharField(max_length=100)
    email = models.EmailField(blank=False, null=False)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    publish_date = models.DateTimeField()
    end_date = models.DateTimeField()
    decription = models.TextField()
    goal = models.DecimalField()
    min_investment = models.DecimalField()
    max_investment = models.DecimalField()
    current_investment = models.DecimalField()
    shares_detail = models.CharField(max_length=100)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.compnay_name + ': ' + {self.business_name}}"
    