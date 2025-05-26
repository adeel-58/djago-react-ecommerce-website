// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find(i => i.id === item.id);
      if (exists) {
        exists.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } = cartSlice.actions;
export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;