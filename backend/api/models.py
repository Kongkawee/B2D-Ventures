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
