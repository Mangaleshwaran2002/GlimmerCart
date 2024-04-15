from rest_framework import serializers
from .models import Category,Products,Cart
# from django.contrib.auth.models import Group, User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'url']


class ProductsSerializer(serializers.HyperlinkedModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Products
        fields = ['id', 'name','price','category','image','description','url']




class CartSerializer(serializers.HyperlinkedModelSerializer):
    product_id = ProductsSerializer()
    class Meta:
        model = Cart
        fields = ['id', 'product_id','quantity']
