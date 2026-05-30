import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./Products/productSlice";
import filtersReducer from "./Filters/filterSlice";
import authReducer from "./Auth/authSlice";
import wishlistReducer from "./Wishlist/wishlistSlice";
import cartReducer from "./Cart/cartSlice";
import ordersReducer from "./Orders/ordersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
