from django.urls import path

from .views import sign_up,login_page,logout_page


urlpatterns = [
    path('login/', login_page, name='login_page'),
    path('logout/', logout_page, name='logout_page'),
    path('signup',sign_up,name='signup_page'),
]