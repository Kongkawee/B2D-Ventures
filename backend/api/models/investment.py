from django.db import models
from .business import Business
from .investor import Investor


class Investment(models.Model):
    """Investment Model represents the investment, containing the information of the investor and business."""
    investor = models.ForeignKey(Investor, on_delete=models.CASCADE)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=20, decimal_places=2)
    shares = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.investor} invested {self.amount} baht in {self.business}, gaining {self.shares} of share."

