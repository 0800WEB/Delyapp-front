// paymentActions.ts
import { createAction } from '@reduxjs/toolkit';

export const registerCashPayment = createAction('payment/registerCash');
export const registerStripePayment = createAction('payment/registerStripe');
export const registerCardPayment = createAction('payment/registerCard');
export const deleteCardPayment = createAction('payment/deleteCard');
export const deleteStripePayment = createAction('payment/deleteStripe');
export const deleteCashPayment = createAction('payment/deleteCash');

