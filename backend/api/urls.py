from django.urls import path
from .views import (
    register_investor, 
    login_investor, 
    register_business, 
    login_business,
    invest,
    ListInvestor, 
    DetailInvestor,
    ListBusiness,
    DetailBusiness,
    ListInvestment,
    DetailInvestment,
)

urlpatterns = [
    path('investor-register/', register_investor, name='InvestorRegister'),
    path('investor-login/', login_investor, name='InvestorLogin'),
    path('business-register/', register_business, name='BusinessRegister'),
    path('business-login/', login_business, name='BusinessLogin'),
    path('invest/', invest, name='Invest'),
    path('investor', ListInvestor.as_view()),
    path('investor/<int:pk>/', DetailInvestor.as_view()),
    path('business', ListBusiness.as_view()),
    path('business/<int:pk>/', DetailBusiness.as_view()),
    path('investment', ListInvestment.as_view()),
    path('investment/<int:pk>/', DetailInvestment.as_view()),
]
