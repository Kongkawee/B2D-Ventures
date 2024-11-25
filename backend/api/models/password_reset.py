from django.db import models
from datetime import datetime


class PasswordReset(models.Model):
    """PasswordReset represents the field needed to store Token for password resetting"""
    email = models.EmailField(blank=False, null=False)
    token = models.CharField(max_length=100)
    used = models.BooleanField(default=False)
    expire_date = models.DateTimeField(null=True)
