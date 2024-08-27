import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri'; // Asegúrate de reemplazar esto con la ruta a tu archivo de constantes
import { _retrieveData } from '@/utils/util'; // Asegúrate de reemplazar esto con la ruta a tu función de almacenamiento
import { Toast } from "react-native-toast-notifications";

export const useCoupon = createAsyncThunk(
  'coupon/useCoupon',
  async (code: string, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });

      if (!token) {
        return rejectWithValue("No token found");
      }
    //   console.log(token)

      const response = await axios.post(`${SERVER_URI}/coupons/${code}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response)
      if(response.data.success){
        Toast.show("Cupón aplicado con éxito", { type: "success" });
              return response.data.coupon;
      } else {
        Toast.show(response.data.message, { type: "danger" });
          return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error using coupon");
    }
  }
);