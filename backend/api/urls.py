from django.urls import path
from . import views

urlpatterns = [
    path('', views.ListInvestor.as_view()),
    path('<int:pk>/', views.DetailInvestor.as_view()),
]