// paymentReducer.ts
import { createReducer } from "@reduxjs/toolkit";
import {
  registerCashPayment,
  registerStripePayment,
  registerCardPayment,
  deleteCardPayment,
  deleteStripePayment,
  deleteCashPayment,
} from "./paymentMethodsActions";

interface PaymentState {
  method: "stripe" | "credit_card" | "cash" | null;
}

const initialState: PaymentState = {
  method: null,
};

const paymentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerCashPayment, (state) => {
      state.method = "cash";
    })
    .addCase(registerStripePayment, (state) => {
      state.method = "stripe";
    })
    .addCase(registerCardPayment, (state) => {
      state.method = "credit_card";
    })
    .addCase(deleteCardPayment, (state) => {
      if (state.method === "credit_card") {
        state.method = null;
      }
    })
    .addCase(deleteCashPayment, (state) => {
      if (state.method === "cash") {
        state.method = null;
      }
    })
    .addCase(deleteStripePayment, (state) => {
      if (state.method === "stripe") {
        state.method = null;
      }
    });
});

export default paymentReducer;
