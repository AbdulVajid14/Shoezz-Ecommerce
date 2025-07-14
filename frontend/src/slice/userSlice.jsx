
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axiosIntence';
import { toast } from 'react-toastify';



export const getOrders = createAsyncThunk(
  'user/getOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${userId}`);
      if (response.data) {
        return response.data;
      } else {
        throw new Error('No orders found for this user.');
      }
    } catch (error) {
      toast.error('Failed to fetch orders.');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'user/addToCart',
  async ({ productId, quantity, selectedSize }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart', { productId, quantity, selectedSize });
      return response.data.items; 
    } catch (error) {
      toast.error('Failed to add item to cart.');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/${productId}`);
      toast.success('Item removed from cart!');
      return productId; 
    } catch (error) {
      toast.error('Failed to remove item from cart.');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, newQuantity }, { rejectWithValue }) => {
    try {
      await api.put(`/cart/${productId}`, { quantity: newQuantity });
      toast.success('Quantity updated!');
      return { productId, newQuantity }; 
    } catch (error) {
      toast.error('Failed to update quantity.');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: JSON.parse(localStorage.getItem('user'))?.cart || [],
  orders: JSON.parse(localStorage.getItem('user'))?.orders || [],
  status: 'idle', 
  error: null, 
  isAuthenticated: !!localStorage.getItem('user'), 
  role: JSON.parse(localStorage.getItem('user'))?.role || null, 
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      state.cart = [];
      state.orders = [];
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setLoading: (state, action) => {
      state.status = action.payload ? 'loading' : 'idle';
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload; 
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = state.cart.filter((item) => item.product._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(updateQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { productId, newQuantity } = action.payload;
        state.cart = state.cart.map((item) =>
          
          item.product._id === productId ? { ...item, quantity: newQuantity } : item

        );
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setUser, logoutUser, setCart, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;