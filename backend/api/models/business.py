from django.db import models


class Business(models.Model):
    """Business Model represents the business, containing their company and business details"""
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    company_name = models.CharField(max_length=100)
    business_name = models.CharField(max_length=80)
    email = models.EmailField(blank=False, null=False)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    publish_date = models.DateTimeField()
    end_date = models.DateTimeField()
    fundraise_purpose = models.TextField(max_length=200)
    brief_description = models.TextField(max_length=200)
    pitch = models.JSONField(default=dict, null=True, blank=True) # Remove null blank after tested
    business_category = models.JSONField(default=list, null=True, blank=True) # Remove null blank after tested
    country_located = models.CharField(max_length=50, null=True, blank=True) # Remove null blank after tested
    province_located = models.CharField(max_length=50, null=True, blank=True) # Remove null blank after tested
    goal = models.DecimalField(max_digits=12, decimal_places=2)
    min_investment = models.DecimalField(max_digits=12, decimal_places=2)
    max_investment = models.DecimalField(max_digits=12, decimal_places=2)
    current_investment = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    price_per_share = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=50, default="pending")
    cover_image = models.ImageField(upload_to='business/cover_image', null=True, blank=True)  # Image field for cover image
    describe_images = models.ImageField(upload_to='business/describe_image', null=True, blank=True)  # Image field for additional images

    def __str__(self):
        return f"{self.company_name}: {self.business_name}"
    