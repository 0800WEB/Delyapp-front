import { createReducer } from "@reduxjs/toolkit";

import productsActions from "./productsActions";
const { get_allItems } = productsActions;

interface Product {
  __v: number;
  _id: string;
  category: string;
  createdAt: string;
  description: string;
  images: Array<any>;
  name: string;
  price: number;
  stock: number;
  updatedAt: string;
}

interface ProductsState {
  limit: number;
  products: Product[];
  success: boolean;
  totalProducts: number;
}
const initialState = {
  limit: 0,
  products: [],
  success: false,
  totalProducts: 0,
  error: null as any,
  loading: false,
};

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(get_allItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(get_allItems.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    })
    .addCase(get_allItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default productsReducer;
