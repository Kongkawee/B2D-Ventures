from django.urls import path
from . import views

urlpatterns = [
    path('invest/', views.invest, name='invest'),
    path('investor/', views.ListInvestor.as_view(), name='all_investor'),
    path('investor/<int:pk>/', views.DetailInvestor.as_view(), name='specific_investor'),
    path('investor/profile/', views.CurrentInvestorProfile.as_view(), name='current_investor_profile'),
    path('investor/investment/', views.CurrentInvestorInvestment.as_view(), name='current_investor_investment'),

    path('business/', views.ListBusiness.as_view(), name='all_business'),
    path('business/card/', views.ListAvailableBusinessForCard.as_view(), name='all_available_business_card'),
    path('business/<int:pk>/', views.DetailBusiness.as_view(), name='specific_business'),
    path('business/profile/', views.CurrentBusinessProfile.as_view(), name='current_business_profile'),
    path('business/fundraise/', views.CurrentBusinessFundraise.as_view(), name='current_business_fundraise'),

    path('investment/', views.ListInvestment.as_view(), name='all_investment'),
    path('investment/<int:pk>/', views.DetailInvestment.as_view(), name='specific_investment'),
    path('investment/investor/<int:pk>/', views.InvestmentByInvestorView.as_view(), name='investment_by_investor'),
]
