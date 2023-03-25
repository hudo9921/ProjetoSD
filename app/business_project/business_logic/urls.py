from django.urls import path
from .views import *



urlpatterns = [
    path('cart/<int:product_id>', AddToCartAPIView.as_view(), name='add_to_cart'),
    path('product/', ProductListCreate.as_view(), name='product_lc'),
    path('product/categories', ProductsCategories.as_view(), name='product_categories'),
    path('product/<int:id>', ProductRetrieveUpdateDestroy.as_view(), name='product_rud'),
    path('product/top_rated_products', TopRatedProducts.as_view(), name='top_rated_products'),
]