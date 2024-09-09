import { createReducer } from "@reduxjs/toolkit";
import favoriteActions from "./favoritesActions";
const { toggleFavorite, getFavorites, removeFromFavorites } = favoriteActions;

const initialState = {
  favorites: {
    products: [],
  },
  loading: false,
  error: null as any,
};

const favoriteReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(toggleFavorite.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites.products = action.payload.products;
      state.error = null;
    })
    .addCase(toggleFavorite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(getFavorites.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
      state.error = null;
    })
    .addCase(getFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(removeFromFavorites.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.loading = false;
      state.favorites.products = action.payload.products;
      state.error = null;
    })
    .addCase(removeFromFavorites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
});

export default favoriteReducer;