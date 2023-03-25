from rest_framework import serializers
from .models import *



class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# class ProductCategoriesSerializer(serializers.Serializer):
#     catego
#     class Meta:
#         model = Product
#         fields = ('category',)
