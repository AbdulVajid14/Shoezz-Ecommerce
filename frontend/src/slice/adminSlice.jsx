
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axiosIntence'; 
export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users'); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'admin/fetchUserDetails',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status, userId }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/orders/${orderId}/status`,
        { status }
      );
      return { orderId, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUsersOrders = createAsyncThunk(
  'admin/fetchUsersOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/order');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

  export const updateUserBlockStatus = createAsyncThunk(
  'admin/updateUserBlockStatus',
  async ({ userId, isBlocked }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/users/${userId}/block`,
        { isBlocked }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const [productsResponse, usersResponse, ordersResponse] = await Promise.all([
        api.get('/products'),
        api.get('/users'),
        api.get('/admin/orders'),
      ]);

      const products = productsResponse.data;
      const users = usersResponse.data;
      const orders = ordersResponse.data;

      const monthlySales = Array(12).fill(0);
      const monthlyProfit = Array(12).fill(0);

      orders.forEach((order) => {
        const orderDate = new Date(order.orderDate);
        const month = orderDate.getMonth();

        order.cartItems?.forEach((item) => {
          monthlySales[month] += item.product.price * item.quantity;
          monthlyProfit[month] += item.product.price * item.quantity * 0.3; 
        });
      });

      const latestOrders = orders
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);

      return {
        totalProducts: products.length,
        totalUsers: users.length,
        totalOrders: orders.length,
        totalSales: monthlySales.reduce((sum, value) => sum + value, 0),
        totalProfit: monthlyProfit.reduce((sum, value) => sum + value, 0),
        monthlySales,
        monthlyProfit,
        latestOrders,
        users,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/products/add', newProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'admin/editProduct',
  async ({ _id, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/products/${_id}`, updatedProduct);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to update product');
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    totalProducts: 0,
    totalUsers: 0,
    totalSales: 0,
    totalProfit: 0,
    totalOrders: 0,
    monthlySales: [],
    monthlyProfit: [],
    latestOrders: [],
    products: [],
    users: [],
    orders: [],
    loading: false,
    error: null,
    selectedUserDetails: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(updateUserBlockStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.totalProducts;
        state.totalUsers = action.payload.totalUsers;
        state.totalSales = action.payload.totalSales;
        state.totalOrders = action.payload.totalOrders;
        state.totalProfit = action.payload.totalProfit;
        state.monthlySales = action.payload.monthlySales;
        state.monthlyProfit = action.payload.monthlyProfit;
        state.latestOrders = action.payload.latestOrders;
        state.users = action.payload.users; 
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        const order = state.users.find((order) => order._id === orderId);
        if (order) {
          order.status = status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUsersOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUserDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts } = adminSlice.actions;

export default adminSlice.reducer;
