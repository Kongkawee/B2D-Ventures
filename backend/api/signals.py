from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Business


@receiver(post_save, sender=Business)
def check_business_status(sender, instance, **kwargs):
    """Update the status of the business to 'closed' if end_date has passed or goal is reached."""
    if instance.end_date and instance.end_date < timezone.now():
        instance.status = "completed"
    
    elif instance.current_investment >= instance.goal:
        instance.status = "completed"

    if instance.status == "completed":
        instance.save()
