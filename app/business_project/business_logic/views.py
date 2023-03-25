from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from decimal import Decimal

class AddToCartAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, product_id):
        product = get_object_or_404(Product, id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product, price=product.price)
        
        if item_created:
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            cart_item.quantity += 1
            cart_item.save()
            serializer = CartItemSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)

class ClearCartAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart.cartitem_set.all().delete()
            return Response({'message': 'carrinho limpo'}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({'error': 'carrinho nao existe'}, status=status.HTTP_404_NOT_FOUND)
        
class CreateOrderAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, *args, **kwargs):
        user_cart = Cart.objects.get(user=request.user)
        order = Order.objects.create(user=user_cart.user, total_price=Decimal('0'), status='Pending')

        for cart_item in user_cart.cartitem_set.all():
            order_item = OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.price
            )
            order.total_price += order_item.price*order_item.quantity

        order.save()

        user_cart.cartitem_set.all().delete()

        serializer = OrderSerializer(order)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class ProductListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title',]
    filterset_fields = ['category',]

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
    

class ProductsCategories(APIView):
    permission_classes = []

    def get(self, request):
        categories = Product.objects.all().values_list('category', flat=True).distinct()
        return Response(categories, status=status.HTTP_200_OK)
