from django.urls import path
from .views import *



urlpatterns = [
    path('cart/add-to-cart/<int:product_id>', AddToCartAPIView.as_view(), name='add_to_cart'),
    path('cart/clear', ClearCartAPIView.as_view(),name='clear_cart'),
    path('cart/', GetUserCartAPIView.as_view(),name='get_cart'),
    path('product/', ProductListCreate.as_view(), name='product_lc'),
    path('product/categories', ProductsCategories.as_view(), name='product_categories'),
    path('product/<int:id>', ProductRetrieveUpdateDestroy.as_view(), name='product_rud'),
    path('product/top_rated_products', TopRatedProducts.as_view(), name='top_rated_products'),
    path('orders/create/<int:cart_id>', CreateOrderAPIView.as_view(), name='create-order'),
    path('cart/clear', ClearCartAPIView.as_view(),name='clear_cart')
]