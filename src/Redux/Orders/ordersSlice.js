import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { collection, getDocs, doc, setDoc } from "firebase/firestore";

import { db } from "../../Firebase/firebase";

// Fetch Orders

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (uid, thunkAPI) => {
    try {
      const ordersRef = collection(db, "users", uid, "orders");

      const snapshot = await getDocs(ordersRef);

      const orders = snapshot.docs.map((doc) => doc.data());

      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Place Order

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ uid, items, total }, thunkAPI) => {
    try {
      const orderId = Date.now().toString();

      const order = {
        id: orderId,
        items,
        total,
        createdAt: new Date().toISOString(),
      };

      const orderDocRef = doc(db, "users", uid, "orders", orderId);

      await setDoc(orderDocRef, order);

      return order;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Orders

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Place Order

      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.items.unshift(action.payload);
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors

export const selectOrders = (state) => state.orders.items;

export const selectOrdersLoading = (state) => state.orders.loading;

export const selectOrdersError = (state) => state.orders.error;

// Reducer

export default ordersSlice.reducer;
