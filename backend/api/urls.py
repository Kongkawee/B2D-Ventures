from django.urls import path
from .views import register_investor, login_investor

urlpatterns = [
    path('register/', register_investor, name='register'),
    path('login/', login_investor, name='login'),
]
