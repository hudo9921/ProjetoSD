from django.contrib import admin
from .models import *

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'price', 'category', 'rating_rate', 'rating_count')
    list_filter = ('category', 'price')
    search_fields = ('title', 'description')


class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'products')
    list_filter=('user','id')
    

    def products(self, obj):
        return ", ".join([item.product.title for item in obj.cartitem_set.all()])



admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
