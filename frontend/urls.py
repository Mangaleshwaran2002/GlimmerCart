from django.urls import path
from .views import index_page,product_page,cart_page
urlpatterns = [
    path('',index_page,name="index_page"),
    path('product/', product_page,name="product_page"),
    path('cart_page/', cart_page,name="cart_page"),
]