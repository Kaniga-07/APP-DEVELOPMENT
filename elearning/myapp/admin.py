from django.contrib import admin
from .models import Payment, Teacher, Contact, ContactMessage

# PaymentAdmin configuration
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('cardholder_name', 'card_number', 'expiration_month', 'expiration_year', 'billing_address')
    search_fields = ('cardholder_name', 'card_number')
    list_filter = ('expiration_year',)

admin.site.register(Payment, PaymentAdmin)

# TeacherAdmin configuration
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'hours', 'rate')  
    search_fields = ('name',) 
    list_filter = ('rate',) 

admin.site.register(Teacher, TeacherAdmin)

# ContactAdmin configuration
class ContactAdmin(admin.ModelAdmin):
    list_display = ('email', 'phone', 'address')  
    search_fields = ('email', 'phone')  
    list_filter = ('address',) 

admin.site.register(Contact, ContactAdmin)

# ContactMessageAdmin configuration
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject','message') 
    search_fields = ('name', 'email', 'subject','message')  
    list_filter = ('email',) 

admin.site.register(ContactMessage, ContactMessageAdmin)
