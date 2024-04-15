from django.urls import path,include

from rest_framework import routers

from .views import CategoryViewSet,ProductsViewSet,Cart_list,Cart_add,Cart_dec

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'products', ProductsViewSet)


urlpatterns = [
    path('cart/',Cart_list,name="cart"),
    path('cart_add/<int:id>/',Cart_add,name="Cart_add"),
    path('cart_dec/<int:id>/',Cart_dec,name="Cart_dec"),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

urlpatterns += router.urls