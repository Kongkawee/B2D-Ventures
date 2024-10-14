from django.urls import path
from . import views

urlpatterns = [
    path('investor-login/', views.login_investor, name='InvestorLogin'),
    path('business-register/', views.register_business, name='BusinessRegister'),
    path('business-login/', views.login_business, name='BusinessLogin'),
    path('invest/', views.invest, name='Invest'),
    path('investor/', views.ListInvestor.as_view()),
    path('investor/<int:pk>/', views.DetailInvestor.as_view()),
    path('business/', views.ListBusiness.as_view()),
    path('business/<int:pk>/', views.DetailBusiness.as_view()),
    path('investment/', views.ListInvestment.as_view()),
    path('investment/<int:pk>/', views.DetailInvestment.as_view()),
    path('investment/investor/<int:pk>/', views.InvestmentByInvestorView.as_view(), name='investment-by-investor'),

    path('investor/profile/', views.CurrentInvestorProfile.as_view(), name='CurrentInvestorProfile'),
    path('investor/investment/', views.CurrentInvestorInvestment.as_view(), name='CurrentInvestorInvestment'),
]
