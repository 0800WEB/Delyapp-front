import { createReducer } from "@reduxjs/toolkit";

import authActions from "./authActions";
const { sign_in, sign_up, verify_code } = authActions;

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  ageVerified: boolean;
}

interface AuthState {
  userInfo: UserInfo | null;
  token: string | null;
  error: string | null;
  loading: boolean;
}

const initialState = {
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
      state.token = action.payload.token;
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
    });
});

export default authReducer;