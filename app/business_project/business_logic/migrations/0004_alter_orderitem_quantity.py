# Generated by Django 4.0 on 2023-03-21 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0003_alter_product_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
