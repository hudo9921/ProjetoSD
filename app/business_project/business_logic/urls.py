from django.urls import path
from .views import *



urlpatterns = [
    path('cart/<int:product_id>', AddToCartAPIView.as_view(), name='test'),
]