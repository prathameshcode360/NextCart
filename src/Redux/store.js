import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./Products/productSlice";
import filtersReducer from "./Filters/filterSlice";
import authReducer from "./Auth/authSlice";
import wishlistReducer from "./Wishlist/wishlistSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
