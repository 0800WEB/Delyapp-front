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
  email: string;
  code: string;
}

interface ReVerifyCodeArgs {
  email: string;
}

interface UpdateUserArgs {
  id: string;
  name: string;
  email: string;
  phone: string;
  ageVerified: boolean;
  address: string;
}

export const sign_in = createAsyncThunk(
  "users/signin",
  async ({ email, password }: SignInArgs, { rejectWithValue }) => {
    try {
      // console.log("email: ", email);
      // console.log("password: ", password);
      console.log(`${SERVER_URI}/users/signin`);
      const response = await axios.post(`${SERVER_URI}/users/signin`, {
        email,
        password,
      });
      await _storeData({ key: "userToken", value: response.data.token });
      await _storeData({ key: "userInfo", value: response.data.user });
      // console.log("response: ", response);
      return { token: response.data.token, userInfo: response.data.user };
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
      // console.log(response);
      if (response.data.success) {
        Toast.show(response.data.message, { type: "success" });
        router.push("/(routes)/verify-account");
        console.log(response.config.data);
        return { userInfo: response.config.data };
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", {
          type: "danger",
        });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

export const verify_code = createAsyncThunk(
  "users/verify_code",
  async ({ email, code }: VerifyCodeArgs, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${SERVER_URI}/users/verify/${code}`, {
        email,
      });
      if (response.data.success) {
        Toast.show("Cuenta verificada exitosamente", { type: "success" });
        router.push("/(routes)/sign-in");
        await _removeData({key: "userInfo"});
        return response.data;
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", {
          type: "danger",
        });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

export const re_verify_code = createAsyncThunk(
  "users/re_verify_code",
  async ({ email }: ReVerifyCodeArgs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URI}/users/verify/resend_code`, {
        email,
      });
      // console.log(response)
      if (response.data.success) {
        Toast.show("Correo de verificación re-enviado", { type: "success" });        
        await _removeData({key: "userInfo"});
        return response.data;
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", {
          type: "danger",
        });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

export const update_user = createAsyncThunk(
  "users/update",
  async ({ id, name, email, phone }: UpdateUserArgs, { rejectWithValue }) => {
    try {
      const userToken = await _retrieveData({ key: "userToken" });
      const response = await axios.patch(`${SERVER_URI}/users/update`, {
        name,
        email,
        phone,
      }, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      if (response.data.success) {
        Toast.show("Usuario actualizado exitosamente", { type: "success" });
        await _storeData({ key: "userInfo", value: response.data.user });
        return { userInfo: response.data.user };
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", {
          type: "danger",
        });
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(parseError({ error }));
    }
  }
);

export const sign_out = createAsyncThunk(
  "users/signout",
  async (_, { rejectWithValue }) => {
    try {
      const userToken = await _retrieveData({ key: "userToken" });
      const userInfo = await _retrieveData({key: "userInfo"})
      console.log(userToken)
      console.log(userInfo)
      const response = await axios.post(`${SERVER_URI}/users/signout`, {}, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      await _removeData({ key: "userToken" });
      await _removeData({ key: "userInfo" });
      // console.log("Borrando: ",response);
      return response.data;
    } catch (error) {
      const userInfo = await _retrieveData({key: "userInfo"})
      const userToken = await _retrieveData({ key: "userToken" });
      console.log(userToken)
      console.log(userInfo)
      await _removeData({ key: "userToken" });
      await _removeData({ key: "userInfo" });
      return rejectWithValue(parseError({ error }));
    }
  }
);


const actions = { sign_in, sign_up, verify_code, update_user, sign_out, re_verify_code };
export default actions;
