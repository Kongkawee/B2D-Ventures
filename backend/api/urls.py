from django.urls import path
from .views import *

urlpatterns = [
    path('invest/', invest, name='invest'),
    
    path('investor/', ListInvestor.as_view(), name='all_investor'),
    path('investor/<int:pk>/', DetailInvestor.as_view(), name='specific_investor'),
    path('investor/profile/', CurrentInvestorProfile.as_view(), name='current_investor_profile'),
    path('investor/investment/', CurrentInvestorInvestment.as_view(), name='current_investor_investment'),
    path('investor/update/', UpdateInvestor.as_view(), name='update_investor'),


    path('business/', ListBusiness.as_view(), name='all_business'),
    path('business/card/', ListAvailableBusinessForCard.as_view(), name='all_available_business_card'),
    path('business/<int:pk>/', DetailBusiness.as_view(), name='specific_business'),
    path('business/profile/', CurrentBusinessProfile.as_view(), name='current_business_profile'),
    path('business/fundraise/', CurrentBusinessFundraise.as_view(), name='current_business_fundraise'),
    path('business/<int:business_id>/upload_images/', upload_business_images, name='upload_business_images'),


    path('investment/', ListInvestment.as_view(), name='all_investment'),
    path('investment/<int:pk>/', DetailInvestment.as_view(), name='specific_investment'),
    path('investment/investor/<int:pk>/', InvestmentByInvestorView.as_view(), name='investment_by_investor'),
    path('investment/business/<int:business_id>/', InvestmentByBusinessView.as_view(), name='investment-by-business'),

]
