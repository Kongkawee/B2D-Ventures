# Generated by Django 4.2.4 on 2024-11-27 14:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_remove_business_province_located_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessDocument',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document', models.FileField(upload_to='business/documents')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('business', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='api.business')),
            ],
        ),
    ]