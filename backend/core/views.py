# views.py (cleaned and structured)

from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CartItem
from .serializers import CartItemSerializer
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework import viewsets, status
from .models import Cart, CartItem, Product
from rest_framework.views import APIView






from .models import (
    Category, Product, ProductImage, Review, CartItem, Order,
    OrderItem, Payment, Shipping
)
from .serializers import (
    CategorySerializer, ProductSerializer, ProductImageSerializer, ReviewSerializer,
    CartItemSerializer, OrderSerializer, OrderItemSerializer,
    PaymentSerializer, ShippingSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny] 

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category__slug']
    permission_classes = [AllowAny] 


from rest_framework import generics, permissions
from .serializers import OrderSerializer
from .models import Order

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [AllowAny]

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny] 

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

class ShippingViewSet(viewsets.ModelViewSet):
    queryset = Shipping.objects.all()
    serializer_class = ShippingSerializer


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get or create cart for current user
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart)

    def create(self, request, *args, **kwargs):
        user = request.user
        product = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product:
            return Response({"detail": "Product ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product_obj = Product.objects.get(id=product)
        except Product.DoesNotExist:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=user)

        # Try to get existing cart item for this product
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product_obj)

        if not created:
            # If exists, increment quantity
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        
        cart_item.save()
        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Optionally, you can restrict update to quantity only:
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        quantity = request.data.get('quantity')
        if quantity is None:
            return Response({"detail": "Quantity is required for update."}, status=status.HTTP_400_BAD_REQUEST)
        
        instance.quantity = int(quantity)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_cart_items(request):
    try:
        # Try to get the cart associated with the authenticated user
        cart = Cart.objects.get(user=request.user)
        cart_items = CartItem.objects.filter(cart=cart)

        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Cart.DoesNotExist:
        # If cart does not exist, return an empty list
        return Response([], status=status.HTTP_200_OK)

    except Exception as e:
        # General error handling
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    cart, created = Cart.objects.get_or_create(user=user)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    cart_item.quantity = quantity
    cart_item.save()

    serializer = CartItemSerializer(cart)
    return Response(serializer.data, status=status.HTTP_200_OK)    




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    try:
        item_id = request.data.get('product_id')
        quantity = request.data.get('quantity')

        cart = Cart.objects.get(user=request.user)
        cart_item = CartItem.objects.get(cart=cart, product_id=item_id)

        if int(quantity) <= 0:
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=200)

        cart_item.quantity = quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=200)

    except (Cart.DoesNotExist, CartItem.DoesNotExist):
        return Response({'error': 'Cart item not found'}, status=404)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, pk):
    try:
        cart = Cart.objects.get(user=request.user)
        item = CartItem.objects.get(cart=cart, product_id=pk)
        item.delete()
        return Response({'detail': 'Item removed from cart'})
    except (Cart.DoesNotExist, CartItem.DoesNotExist):
        return Response({'detail': 'Item not found'}, status=404)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CartItem, Product

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item_quantity(request, pk):
    try:
        cart_item = CartItem.objects.get(cart__user=request.user, product_id=pk)
        data = request.data
        new_quantity = data.get('quantity', None)

        if new_quantity is not None and int(new_quantity) > 0:
            cart_item.quantity = int(new_quantity)
            cart_item.save()
            return Response({'detail': 'Quantity updated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid quantity.'}, status=status.HTTP_400_BAD_REQUEST)

    except CartItem.DoesNotExist:
        return Response({'detail': 'Cart item not found.'}, status=status.HTTP_404_NOT_FOUND)
