import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Actions

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

// Selectors

export const selectUser = (state) => state.auth.user;

export const selectLoading = (state) => state.auth.loading;

export const selectError = (state) => state.auth.error;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

// Reducer

export default authSlice.reducer;
