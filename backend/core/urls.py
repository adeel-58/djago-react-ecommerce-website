from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, ProductImageViewSet,
    ReviewViewSet, CartViewSet, OrderViewSet, OrderItemViewSet,
    PaymentViewSet, ShippingViewSet
)
from .views import user_cart_items
from .auth_views import RegisterView, get_profile
from .views import add_to_cart
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'cart-items', CartViewSet, basename='cart-items')  # Cart operations here
router.register(r'orders', OrderViewSet)
router.register(r'order-items', OrderItemViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'shipping', ShippingViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/profile/', get_profile, name='profile'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('cart/', user_cart_items, name='get-cart-items'),
     path('cart/add/', add_to_cart, name='add_to_cart'),
    path('', include(router.urls)),
]
