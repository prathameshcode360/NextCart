import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../../Firebase/firebase";

// Fetch Cart

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (uid, thunkAPI) => {
    try {
      const cartRef = collection(db, "users", uid, "cart");

      const snapshot = await getDocs(cartRef);

      const items = snapshot.docs.map((doc) => doc.data());

      return items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Add To Cart

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ uid, product }, thunkAPI) => {
    try {
      const cartDocRef = doc(db, "users", uid, "cart", String(product.id));

      const existingDoc = await getDoc(cartDocRef);

      if (existingDoc.exists()) {
        const existingData = existingDoc.data();

        const updatedItem = {
          ...existingData,
          quantity: existingData.quantity + 1,
        };

        await setDoc(cartDocRef, updatedItem);

        return updatedItem;
      }

      const newItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
        quantity: 1,
      };

      await setDoc(cartDocRef, newItem);

      return newItem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Remove From Cart

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ uid, productId }, thunkAPI) => {
    try {
      const cartDocRef = doc(db, "users", uid, "cart", String(productId));

      await deleteDoc(cartDocRef);

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Increase Quantity

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ uid, productId }, thunkAPI) => {
    try {
      const cartDocRef = doc(db, "users", uid, "cart", String(productId));

      const snapshot = await getDoc(cartDocRef);

      const item = snapshot.data();

      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
      };

      await setDoc(cartDocRef, updatedItem);

      return updatedItem;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Decrease Quantity

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ uid, productId }, thunkAPI) => {
    try {
      const cartDocRef = doc(db, "users", uid, "cart", String(productId));

      const snapshot = await getDoc(cartDocRef);

      const item = snapshot.data();

      if (item.quantity === 1) {
        await deleteDoc(cartDocRef);

        return {
          productId,
          removed: true,
        };
      }

      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
      };

      await setDoc(cartDocRef, updatedItem);

      return {
        ...updatedItem,
        removed: false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Clear Cart

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (uid, thunkAPI) => {
    try {
      const cartRef = collection(db, "users", uid, "cart");

      const snapshot = await getDocs(cartRef);

      const deletePromises = snapshot.docs.map((item) => deleteDoc(item.ref));

      await Promise.all(deletePromises);

      return true;
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

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add To Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })

      // Remove From Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })

      // Increase Quantity
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Decrease Quantity
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        if (action.payload.removed) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.productId,
          );
        } else {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );

          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      })

      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

// Selectors

export const selectCartItems = (state) => state.cart.items;

export const selectCartLoading = (state) => state.cart.loading;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

// Reducer

export default cartSlice.reducer;
