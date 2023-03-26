import os
import json
from business_logic.models import Product
import random

for prod in Product.objects.all():
    prod.stock_quant = random.randint(3,10)
    prod.save()