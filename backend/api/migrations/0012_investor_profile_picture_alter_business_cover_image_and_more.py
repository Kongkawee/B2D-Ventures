# Generated by Django 4.2.4 on 2024-10-17 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_business_country_located_business_province_located'),
    ]

    operations = [
        migrations.AddField(
            model_name='investor',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='investor/'),
        ),
        migrations.AlterField(
            model_name='business',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='business/cover_image'),
        ),
        migrations.AlterField(
            model_name='business',
            name='describe_images',
            field=models.ImageField(blank=True, null=True, upload_to='business/describe_image'),
        ),
    ]
