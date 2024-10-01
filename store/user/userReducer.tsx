import { createReducer } from "@reduxjs/toolkit";

import authActions from "./authActions";
const { sign_in, sign_up, verify_code, update_user, sign_out, re_verify_code } = authActions;

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  ageVerified: boolean;
  address: string;
}

const initialState: AuthState = {
  email: "",
  userInfo: null,
  token: null,
  error: null as any,
  loading: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(sign_in.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(sign_in.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(sign_in.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(sign_up.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(sign_up.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.error = null;
    })
    .addCase(sign_up.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(verify_code.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(verify_code.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(verify_code.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(re_verify_code.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(re_verify_code.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(re_verify_code.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(update_user.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(update_user.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userInfo;
      state.error = null;
    })
    .addCase(update_user.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(sign_out.fulfilled, (state) => {
      state.userInfo = null;
      state.token = null;
      state.error = null;
    })
    .addCase(sign_out.rejected, (state, action) => {
      state.userInfo = null;
      state.error = action.payload;
      state.token = null;
    })
    .addDefaultCase((state) => state);
});

export default authReducer;
