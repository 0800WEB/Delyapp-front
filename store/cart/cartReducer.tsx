import { createReducer } from "@reduxjs/toolkit";
import cartActions from "./cartActions";
const { addToCart, getCart, removeFromCart, clearCart } = cartActions;

const initialState = {
  cart: {
    _id: "",
    products: [],
    totalPrice: 0,
  },
  loading: false,
  error: null as any,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart.products = action.payload.cart.products;
      state.error = null;
    })
    .addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.error = null;
    })
    .addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(removeFromCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart.products = action.payload.cart.products;
      state.error = null;
    })
    .addCase(removeFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(clearCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart.products = action.payload.products;
      state.cart.totalPrice = action.payload.totalPrice;
      state.error = null;
    })
    .addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
});

export default cartReducer;
