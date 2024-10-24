from django.db import models
from django.contrib.auth.models import User

class Business(models.Model):
    """Business Model represents the business, containing their company and business details"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    company_name = models.CharField(max_length=100)
    business_name = models.CharField(max_length=80)
    email = models.EmailField(blank=False, null=False)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    publish_date = models.DateTimeField()
    end_date = models.DateTimeField()
    fundraise_purpose = models.TextField(max_length=200)
    brief_description = models.TextField(max_length=200)
    pitch = models.JSONField(default=dict, null=True, blank=True)
    business_category = models.JSONField(default=list, null=True, blank=True)
    country_located = models.CharField(max_length=50, null=True, blank=True)
    province_located = models.CharField(max_length=50, null=True, blank=True)
    goal = models.DecimalField(max_digits=12, decimal_places=2)
    min_investment = models.DecimalField(max_digits=12, decimal_places=2)
    max_investment = models.DecimalField(max_digits=12, decimal_places=2)
    current_investment = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    price_per_share = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=50, default="pending")
    cover_image = models.ImageField(upload_to='business/cover_image', null=True, blank=True)

    def __str__(self):
        return f"{self.company_name}: {self.business_name}"


class BusinessImage(models.Model):
    """Model for storing multiple images for each Business"""
    business = models.ForeignKey(Business, related_name='describe_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='business/describe_images')

    def __str__(self):
        return f"Image for {self.business.company_name}"
