# Generated by Django 4.2.7 on 2024-01-17 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_products_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='image',
            field=models.ImageField(upload_to='media/photo', verbose_name='product_img'),
        ),
    ]
