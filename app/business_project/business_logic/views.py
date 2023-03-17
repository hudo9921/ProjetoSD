from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem, Product
from .serializers import *
from rest_framework import generics

class AddToCartAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, product_id):
        # Get the product that the user wants to add to the cart
        product = get_object_or_404(Product, id=product_id)
        # Get the user's cart, creating one if it doesn't exist
        cart, created = Cart.objects.get_or_create(user=request.user)
        # Check if the product is already in the cart
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not item_created:
            # If the product is already in the cart, increment the quantity
            cart_item.quantity += 1
            cart_item.save()
            serializer = CartItemSerializer()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # If the product is not in the cart, add it with a quantity of 1
            CartItem.objects.create(cart=cart, product=product, price=product.price)
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method != 'GET':
            self.permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
        self.permission_classes = []
        return super(self.__class__, self).get_permissions()

class ProductRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method != 'GET':
            self.permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
        self.permission_classes = []
        return super(self.__class__, self).get_permissions()
    

class TopRatedProducts(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = []

    def get_queryset(self):
        return Product.objects.all().order_by('-rating_rate')
