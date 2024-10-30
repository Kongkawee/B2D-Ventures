from django.contrib import admin
from django.contrib import messages
from django.contrib.auth.models import User, Group
from django.db.models import Sum
from .models import Investor, Business, Investment, BusinessImage

class BusinessImageInline(admin.TabularInline):  # Use StackedInline for a stacked layout
    model = BusinessImage
    extra = 1  # Number of empty image forms to display
    fields = ['image']  # Fields to display
    readonly_fields = []  # Add 'image_tag' here if you want to show image previews

@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('first_name', 'last_name', 'email')
    ordering = ('id',)
    readonly_fields = ('user',)
    #readonly_fields = ('id', 'user', 'first_name', 'last_name', 'email', 'phone_number')
    
    def has_add_permission(self, request):
        # Disable the add permission
        return False

@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = (
        'company_name',
        'business_name',
        'email',
        'phone_number',
        'publish_date',
        'end_date',
        'status',
        'revenue',
    )
    search_fields = ('company_name', 'business_name', 'email', 'phone_number', 'status')
    list_filter = ('company_name', 'business_name', 'status', 'publish_date', 'end_date')
    ordering = ('status',)
    readonly_fields = ('user','revenue', )
    
    def has_add_permission(self, request):
        # Disable the add permission
        return False
    
    # Include the inline for BusinessImage
    inlines = [BusinessImageInline]
    
    def revenue(self, obj):
        # Sum the 'amount' for all investments related to this business
        total_investment = Investment.objects.filter(business=obj).aggregate(Sum('amount'))['amount__sum'] or 0
        return float(total_investment) * 0.03  # Calculate 3% revenue

    # Set column name in the admin
    revenue.short_description = "Revenue (3%)"
    
    def changelist_view(self, request, extra_context=None):
        # Calculate total revenue across all businesses
        total_investment = Investment.objects.aggregate(Sum('amount'))['amount__sum'] or 0
        total_revenue = float(total_investment) * 0.03

        # Add total revenue to context
        extra_context = extra_context or {}
        extra_context['total_revenue'] = total_revenue

        return super().changelist_view(request, extra_context=extra_context)

    # Define the custom action
    @admin.action(description='Approve selected businesses')
    def approve_businesses(self, request, queryset):
        updated_count = queryset.update(status='Available')
        self.message_user(request, f'{updated_count} business(es) have been approved as available.', messages.SUCCESS)
        
    @admin.action(description='Pause selected businesses')
    def pause_businesses(self, request, queryset):
        updated_count = queryset.update(status='Paused')
        self.message_user(request, f'{updated_count} business(es) have been Paused.', messages.SUCCESS)

    # Register the action
    actions = ['approve_businesses', 'pause_businesses']
    
admin.site.unregister(User)
admin.site.unregister(Group)
