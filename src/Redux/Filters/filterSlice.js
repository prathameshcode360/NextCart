import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  maxPrice: 1000,
  selectedCategories: [],
};

const filterSlice = createSlice({
  name: "filters",

  initialState,

  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },

    toggleCategory: (state, action) => {
      const category = action.payload;

      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (cat) => cat !== category,
        );
      } else {
        state.selectedCategories.push(category);
      }
    },

    clearFilters: (state) => {
      state.searchText = "";
      state.maxPrice = 1000;
      state.selectedCategories = [];
    },
  },
});

// Actions
export const { setSearchText, setMaxPrice, toggleCategory, clearFilters } =
  filterSlice.actions;

// Selectors
export const selectSearchText = (state) => state.filters.searchText;

export const selectMaxPrice = (state) => state.filters.maxPrice;

export const selectSelectedCategories = (state) =>
  state.filters.selectedCategories;

// Reducer
export default filterSlice.reducer;
