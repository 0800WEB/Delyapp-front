import { createReducer } from "@reduxjs/toolkit";
import { createOrder, readOrderStatus, fetchUserOrders } from "./orderActions"; // Asegúrate de reemplazar esto con la ruta a tu acción createOrder

const initialState = {
  order: {
    _id: "",
    deliveryAddress: "",
    paymentMethod: "",
    totalPrice: 0,
    status: "",
  },
  orders: [],
  status: "idle",
  error: null,
  loading: false,
};

const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as null;
    })
    .addCase(readOrderStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(readOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    })
    .addCase(readOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as null;
    })
    .addCase(fetchUserOrders.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.error = null;
    })
    .addCase(fetchUserOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message !== null ? action.error.message : null;
    });
});

export default orderReducer;
