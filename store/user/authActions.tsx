import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URI } from "@/utils/uri";
import {
  _storeData,
  _removeData,
  _retrieveData,
  parseError,
} from "@/utils/util";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import { router } from "expo-router";

interface SignInArgs {
  email: string;
  password: string;
}

interface SignUpArgs {
  name: string;
  email: string;
  password: string;
  phone: string;
  ageVerified: boolean;
}

interface VerifyCodeArgs {
  code: string;
}

export const sign_in = createAsyncThunk(
  "users/signin",
  async ({ email, password }: SignInArgs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URI}/users/signin`, {
        email,
        password,
      });   
      await _storeData({ key: "userToken", value: response.data.token });
      await _storeData({ key: "userInfo", value: response.data.user });    
      console.log("userInfo: ", response.data) 
      return response.data;
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

export const sign_up = createAsyncThunk(
  "users/signup",
  async (
    { name, email, password, phone, ageVerified }: SignUpArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${SERVER_URI}/users/signup`, {
        name,
        email,
        password,
        phone,
        ageVerified,
      });
      // console.log(response.data.success);
      if (response.data.success) {
        Toast.show(response.data.message, { type: "success" });
        router.push("/(routes)/verify-account");
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", {
          type: "danger",
        });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

export const verify_code = createAsyncThunk(
  "users/verify",
  async ({ code }: VerifyCodeArgs, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${SERVER_URI}/users/verify/${code}`);
      if (response.data.success) {
        Toast.show("Cuenta verificada exitosamente", { type: "success" });
        router.push("/(routes)/sign-in");
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", {
          type: "danger",
        });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

const actions = { sign_in, sign_up, verify_code };
export default actions;
