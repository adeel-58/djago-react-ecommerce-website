from .models import CartItem 
from django.shortcuts import get_object_or_404

def get_or_create_cart(request):
    if request.user.is_authenticated:
        CartItem, _ = CartItem.objects.get_or_create(user=request.user)
    else:
        if not request.session.session_key:
            request.session.create()
        session_key = request.session.session_key
        CartItem, _ = CartItem.objects.get_or_create(session_key=session_key)
    return CartItem
