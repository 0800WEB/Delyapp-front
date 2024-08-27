import { createReducer } from "@reduxjs/toolkit";
import { createOrder, readOrderStatus } from "./orderActions"; // Asegúrate de reemplazar esto con la ruta a tu acción createOrder

const initialState = {
  order: {
    _id: "",
    deliveryAddress: "",
    paymentMethod: "",
    totalPrice: 0,
    status: "",
  },
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
    });
});

export default orderReducer;