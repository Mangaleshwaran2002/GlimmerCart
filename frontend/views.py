from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
def index_page(request):
    return render(request,'index.html')

@login_required
def product_page(request):
    return render(request,'product.html')

@login_required
def cart_page(request):
    return render(request,'cart.html')