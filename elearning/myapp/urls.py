from django.urls import path
from .views import save_payment

urlpatterns = [
    path('api/save_payment/', save_payment, name='save_payment_list'),  # For GET and POST
    path('api/save_payment/<int:pk>/', save_payment, name='save_payment_detail'),  # For GET, PUT, DELETE
    
]
