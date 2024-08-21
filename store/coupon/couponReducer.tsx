import { createReducer } from "@reduxjs/toolkit";
import { useCoupon } from "./couponActions"; // Asegúrate de reemplazar esto con la ruta a tu acción useCoupon

const initialState = {
  coupon: {
    discountAmount: 0,
    discountPercentage: 0,
    message: "",
    success: false,
  },
  error: null,
  loading: false,
};

const couponReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(useCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(useCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.error = null;
    })
    .addCase(useCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as null;
    });
});

export default couponReducer;
