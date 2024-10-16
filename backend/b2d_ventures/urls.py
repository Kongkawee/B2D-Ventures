from django.contrib import admin
from django.urls import path, include
from api import views 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/login/', views.login_user, name='investor_login'),

    path('api/investor/register/', views.register_investor, name='investor_register'),

    path('api/business/register/', views.register_business, name='business_register'),

    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),

    path('api-auth/', include('rest_framework.urls')),

    path('api/', include('api.urls')),
]
