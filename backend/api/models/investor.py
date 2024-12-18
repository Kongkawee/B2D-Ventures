from django.db import models
import uuid


class Investor(models.Model):
    """Investor Model represents the investor, containing their name and contacts."""
    uid=models.UUIDField(default=uuid.uuid4, editable=False, max_length=36)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=False, blank=False)
    last_name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(blank=False, null=False, unique=True)
    phone_number = models.CharField(max_length=10, blank=False, null=False)
    profile_picture = models.ImageField(upload_to='investor/', null=True, blank=True)  # Image field for profile picture
    data_sharing_consent = models.BooleanField(blank=False, default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    