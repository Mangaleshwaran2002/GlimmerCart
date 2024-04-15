from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.decorators import login_required
from rest_framework import permissions, viewsets
from .models import Category,Products
from .serializers import CategorySerializer,ProductsSerializer,CartSerializer
from .models import Cart,Products
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ProductsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]



@login_required
def Cart_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    products = Cart.objects.filter(user_id=request.user).all()
    serializer=CartSerializer(products,many=True,context={'request':request})
    # print(serializer.data)
    return JsonResponse(serializer.data, safe=False)



@login_required
def Cart_add(request,id):
    prod=Products.objects.filter(id=id).get()
    if Cart.objects.filter(user_id=request.user,product_id=prod).exists():
        cart=Cart.objects.filter(user_id=request.user,product_id=prod).get()
        cart.quantity += 1
        cart.save()
        return redirect("cart_page")
    else:
        cart=Cart.objects.create(user_id=request.user,product_id=prod)
        cart.quantity += 1
        cart.save()
        return redirect("cart_page")
    
@login_required
def Cart_dec(request,id):
    prod=Products.objects.filter(id=id).get()
    if Cart.objects.filter(user_id=request.user).exists() and Cart.objects.filter(product_id=prod).exists():
        cart=Cart.objects.filter(user_id=request.user,product_id=prod).get()
        if cart.quantity == 1:
            cart.delete()
            # cart.save()
        else:
            cart.quantity -= 1
            cart.save()
        return redirect("cart_page")
    else:
        # cart=Cart.objects.create(user_id=request.user,product_id=prod)
        # cart.quantity += 1
        # cart.save()
        return redirect("cart_page")