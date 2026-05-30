import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../Firebase/firebase";

// Fetch Wishlist

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (uid, thunkAPI) => {
    try {
      const wishlistRef = collection(db, "users", uid, "wishlist");

      const snapshot = await getDocs(wishlistRef);

      const items = snapshot.docs.map((doc) => doc.data());

      return items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Add To Wishlist

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ uid, product }, thunkAPI) => {
    try {
      const wishlistDocRef = doc(
        db,
        "users",
        uid,
        "wishlist",
        String(product.id),
      );

      await setDoc(wishlistDocRef, {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
      });

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// Remove From Wishlist

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ uid, productId }, thunkAPI) => {
    try {
      const wishlistDocRef = doc(
        db,
        "users",
        uid,
        "wishlist",
        String(productId),
      );

      await deleteDoc(wishlistDocRef);

      return productId;
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

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.items.some(
          (item) => item.id === action.payload.id,
        );

        if (!exists) {
          state.items.push(action.payload);
        }
      })

      // Remove
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

// Selectors

export const selectWishlistItems = (state) => state.wishlist.items;

export const selectWishlistLoading = (state) => state.wishlist.loading;

export const selectWishlistCount = (state) => state.wishlist.items.length;

// Reducer

export default wishlistSlice.reducer;
