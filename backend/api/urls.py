from django.urls import path
from .views import register_investor, login_investor, register_business, login_business, ListInvestor, DetailInvestor

urlpatterns = [
    path('investor-register/', register_investor, name='InvestorRegister'),
    path('investor-login/', login_investor, name='InvestorLogin'),
    path('business-register/', register_business, name='BusinessRegister'),
    path('business-login/', login_business, name='BusinessLogin'),
    path('', ListInvestor.as_view()),
    path('<int:pk>/', DetailInvestor.as_view()),
]
