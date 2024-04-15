from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=150,blank=True,null=False)

    def __str__(self) -> str:
        return str(self.name)

class Products(models.Model):
    name=models.CharField(max_length=150,blank=True,null=False)
    price=models.FloatField(blank=True,null=False)
    image=models.ImageField(verbose_name="product_img",upload_to='photo',null=False)
    category=models.ForeignKey(to=Category,on_delete=models.CASCADE,related_name="product_category",null=False)
    description=models.TextField(blank=True,null=True)

class Cart(models.Model):
    user_id=models.ForeignKey(to=User,on_delete=models.CASCADE,related_name="User_cart",null=False)
    product_id=models.ForeignKey(to=Products,on_delete=models.CASCADE,related_name="product_cart",null=False)
    quantity=models.IntegerField(default=0,blank=True,null=True)