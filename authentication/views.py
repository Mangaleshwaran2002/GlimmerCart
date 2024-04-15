from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
# Create your views here.


def sign_up(request):
    if request.method == 'POST':
        username=request.POST.get("username")
        email=request.POST.get("email")
        passwd=request.POST.get("passwd")
        print(username,email,passwd)
        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            messages.add_message(request, messages.ERROR, "Credentials mismatched, Please enter the correct username and password")
            return HttpResponse("username or email is already exists")
        else:
            user=User.objects.create(username=username,email=email)
            user.set_password(passwd)
            user.save()
            user=authenticate(username=username,password=passwd)
            login(request,user)
            return redirect("index_page")
    else:
        return render(request,'auth/signup.html')


def login_page(request):
    if request.method == 'POST':
        username=request.POST.get('username')
        password=request.POST.get('passwd')
        print(f"username :{username} password :{password}")
        
        user=authenticate(username=username,password=password)
        if user:
            print("authendicated user")
            login(request,user)
            return redirect(request.GET.get('next'))
        else:
            messages.add_message(request, messages.ERROR, "Credentials mismatched, Please enter the correct username and password")
            return HttpResponse("Credentials mismatched, Please enter the correct username and password")
    return render(request,'auth/login.html')

from django.conf import settings
def logout_page(request):
    logout(request)
    return redirect("index_page")