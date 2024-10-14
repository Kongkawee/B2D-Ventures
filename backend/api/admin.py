from django.contrib import admin
from .models import Investor, Business, Investment

@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'first_name', 'last_name', 'email', 'phone_number')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('first_name', 'last_name', 'email')
    ordering = ('id',)
    readonly_fields = ('user',)

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'company_name',
        'business_name',
        'email',
        'phone_number',
        'publish_date',
        'end_date',
        'status',
    )
    search_fields = ('company_name', 'business_name', 'email', 'phone_number', 'status')
    list_filter = ('company_name', 'business_name', 'status', 'publish_date', 'end_date')
    ordering = ('id',)
    readonly_fields = ('user',)

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'investor',
        'business',
        'amount',
        'shares',
        'status',
    )
    search_fields = (
        'investor__first_name', 
        'investor__last_name', 
        'business__company_name', 
        'business__business_name', 
        'status'
    )
    list_filter = ('status', 'business')
    ordering = ('id',)
