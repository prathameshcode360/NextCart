import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

// Fetch Products

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=125");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      return data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Basic Selectors

export const selectProducts = (state) => state.products.products;

export const selectLoading = (state) => state.products.loading;

export const selectError = (state) => state.products.error;

// Filtered Products Selector

export const selectFilteredProducts = createSelector(
  [
    selectProducts,
    (state) => state.filters.searchText,
    (state) => state.filters.maxPrice,
    (state) => state.filters.selectedCategories,
  ],
  (products, searchText, maxPrice, selectedCategories) => {
    return products.filter((product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchPrice = product.price <= maxPrice;

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchSearch && matchPrice && matchCategory;
    });
  },
);

// Reducer

export default productsSlice.reducer;
