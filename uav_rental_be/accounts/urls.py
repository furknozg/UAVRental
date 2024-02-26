from django.urls import path
from .views import UserRegistration, UserLogin, CheckToken

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('test-token/', CheckToken.as_view(), name="test-token")
]