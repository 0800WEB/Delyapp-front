import { createReducer } from "@reduxjs/toolkit";

import productsActions from "./productsActions";
const { get_allItems, selectProduct, clearSelectedProduct, get_SearchItem, get_TopOrderedProducts } = productsActions;

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

const initialState = {
  limit: 0,
  products: [],
  searchProducts: [] ,
  topOrderedProducts: [],
  success: false,
  totalProducts: 0,
  error: null as any,
  loading: false,
  selectedProductId: "",
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
    })
    .addCase(selectProduct, (state, action) => {
      state.selectedProductId = action.payload ?? null; // manejar la acción selectProduct
    })
    .addCase(clearSelectedProduct, (state) => {
      state.selectedProductId = ""; // manejar la acción clearSelectedProduct
    })
    .addCase(get_SearchItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(get_SearchItem.fulfilled, (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload?.searchProducts || [];
      state.error = null;
    })
    .addCase(get_SearchItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(get_TopOrderedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(get_TopOrderedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.topOrderedProducts = action.payload;
      state.error = null;
    })
    .addCase(get_TopOrderedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default productsReducer;