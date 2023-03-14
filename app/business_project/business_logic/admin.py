from django.contrib import admin
from .models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category', 'rating_rate', 'rating_count')
    list_filter = ('category', 'price')
    search_fields = ('title', 'description')

admin.site.register(Product, ProductAdmin)
