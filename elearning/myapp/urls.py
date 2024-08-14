from django.urls import path
from .views import TeacherListCreateView, TeacherRetrieveUpdateDestroyView, save_payment, login, signup,contact_view

urlpatterns = [
    path('api/save_payment/', save_payment, name='save_payment_list'),  
    path('api/save_payment/<int:pk>/', save_payment, name='save_payment_detail'),  
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('contact/',contact_view, name='get_contact_info'),
    path('api/teachers/', TeacherListCreateView.as_view(), name='teacher-list'),
    path('api/teachers/<int:pk>/', TeacherRetrieveUpdateDestroyView.as_view(), name='teacher-detail'),
]