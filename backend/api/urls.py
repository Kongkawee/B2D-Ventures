from django.urls import path
from .views import register_investor, login_investor, ListInvestor, DetailInvestor

urlpatterns = [
    path('register/', register_investor, name='register'),
    path('login/', login_investor, name='login'),
    path('', ListInvestor.as_view()),
    path('<int:pk>/', DetailInvestor.as_view()),
]
