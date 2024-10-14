# Generated by Django 5.1 on 2024-10-10 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_business_user_alter_business_business_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='price_per_share',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=4),
            preserve_default=False,
        ),
    ]