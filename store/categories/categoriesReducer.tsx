import { createReducer } from "@reduxjs/toolkit"

import categoriesActions from "./categoriesActions"
const { get_allCategories } = categoriesActions

const initialState = {
  categories: [],
  error: null as any,
  loading: false,
}

const categoriesReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(get_allCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(get_allCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
    })
    .addCase(get_allCategories.rejected, (state, action)=> {
        state.loading = false;
        state.error = action.payload;
    });
});

export default categoriesReducer;