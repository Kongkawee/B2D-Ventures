from django.contrib import admin
from django.contrib import messages
from .models import Investor, Business, Investment, BusinessImage

class BusinessImageInline(admin.TabularInline):  # Use StackedInline for a stacked layout
    model = BusinessImage
    extra = 1  # Number of empty image forms to display
    fields = ['image']  # Fields to display
    readonly_fields = []  # Add 'image_tag' here if you want to show image previews

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
    
    # Include the inline for BusinessImage
    inlines = [BusinessImageInline]

    # Define the custom action
    @admin.action(description='Approve selected businesses')
    def approve_businesses(self, request, queryset):
        updated_count = queryset.update(status='available')
        self.message_user(request, f'{updated_count} business(es) have been approved as available.', messages.SUCCESS)

    # Register the action
    actions = ['approve_businesses']

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
