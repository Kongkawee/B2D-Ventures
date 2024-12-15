from django.contrib import admin
from django.contrib import messages
from django.contrib.auth.models import User, Group
from django.db.models import Sum
from .models import Investor, Business, Investment, BusinessImage, BusinessDocument
from django.contrib.admin.models import LogEntry

class BusinessImageInline(admin.TabularInline):  # Use StackedInline for a stacked layout
    model = BusinessImage
    extra = 1  # Number of empty image forms to display
    fields = ['image']  # Fields to display
    readonly_fields = []  # Add 'image_tag' here if you want to show image previews

class BusinessDocumentInline(admin.TabularInline):  # Inline admin for BusinessDocument
    model = BusinessDocument
    extra = 1  # Number of empty document forms to display
    fields = ['document', 'name']  # Fields to display in the inline admin
    readonly_fields = []  # Specify any fields you want to make read-only

@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    ordering = ('first_name',)
    readonly_fields = ('user',)
    #readonly_fields = ('id', 'user', 'first_name', 'last_name', 'email', 'phone_number')
    
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['title'] = 'Investor Management'

        return super().changelist_view(request, extra_context=extra_context)
    
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
    list_filter = ('status', 'publish_date', 'end_date')
    ordering = ('status',)
    readonly_fields = ('user','revenue', )
    
    #def has_add_permission(self, request):
        # Disable the add permission
    #    return False
    
    # Include the inline for BusinessImage
    inlines = [BusinessImageInline, BusinessDocumentInline]
    
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
        extra_context['title'] = 'Business Management'


        return super().changelist_view(request, extra_context=extra_context)

    # Define the custom action
    @admin.action(description='Approve selected businesses')
    def approve_businesses(self, request, queryset):
        updated_count = queryset.update(status='available')
        self.message_user(request, f'{updated_count} business(es) have been approved as available.', messages.SUCCESS)
        
    @admin.action(description='Pause selected businesses')
    def pause_businesses(self, request, queryset):
        updated_count = queryset.update(status='paused')
        self.message_user(request, f'{updated_count} business(es) have been Paused.', messages.SUCCESS)

    # Register the action
    actions = ['approve_businesses', 'pause_businesses']
    
    
@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'action_time', 'content_type', 'action_flag', 'change_message')
    search_fields = ['user__username', 'change_message']
    
logs = LogEntry.objects.all()

# Filter logs (e.g., only additions)
addition_logs = LogEntry.objects.filter(action_flag=1)  # 1 = Addition, 2 = Change, 3 = Deletion

# Display details of a log entry
for log in logs:
    print(f"Action: {log.get_action_flag_display()}")
    print(f"User: {log.user.username}")
    print(f"Model: {log.content_type}")
    print(f"Message: {log.change_message}")
    
admin.site.unregister(User)
admin.site.unregister(Group)

