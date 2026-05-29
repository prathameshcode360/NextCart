import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Products/productSlice";
import filtersReducer from "./Filters/filterSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
  },
});

export default store;
