// redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendBaseURL = 'http://127.0.0.1:8000';

const initialState = {
  cartItems: [],
};

// 🔄 Thunk: Update cart item quantity on server and state
// redux/slices/cartSlice.js

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ id, qty }, { dispatch }) => {
    const token = localStorage.getItem('access_token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      quantity: qty, // backend does not need `product_id` in body
    };

    try {
      await axios.put(`${backendBaseURL}/api/cart/update/${id}/`, body, config);
      dispatch(updateItemQuantity({ id, qty }));
    } catch (error) {
      console.error('Error updating cart quantity:', error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ Add item to cart
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find(i => i.id === item.id);
      if (exists) {
        exists.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
    },

    // ✅ Replace the entire cart (if needed)
    updateCart: (state, action) => {
      state.cartItems = action.payload.items;
    },

    // ✅ Remove item by id
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
    },

    // ✅ Clear entire cart
    clearCart: (state) => {
      state.cartItems = [];
    },

    // ✅ Set cart items directly (useful when syncing from backend)
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    // ✅ Update quantity of a specific item
    updateItemQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) {
        item.qty = qty;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCartItems,
  updateCart,
  updateItemQuantity,
} = cartSlice.actions;



export default cartSlice.reducer;
