from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Business


@receiver(post_save, sender=Business)
def check_business_status(sender, instance, **kwargs):
    """Update the status of the business to 'completed' if end_date has passed or goal is reached."""
    # Determine the new status based on conditions
    new_status = instance.status
    if instance.end_date and instance.end_date < timezone.now():
        new_status = "completed"
    elif instance.current_investment >= instance.goal:
        new_status = "completed"
    
    if instance.status != new_status:
        instance.status = new_status
        instance.save()
