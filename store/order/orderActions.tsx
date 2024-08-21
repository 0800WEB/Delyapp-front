import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri'; // Asegúrate de reemplazar esto con la ruta a tu archivo de constantes
import { _retrieveData } from '@/utils/util'; // Asegúrate de reemplazar esto con la ruta a tu función de almacenamiento

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ cartId, deliveryAddress, paymentMethod, couponId }: { cartId: string, deliveryAddress: string, paymentMethod: string, couponId?: string }, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      console.log(cartId, deliveryAddress, paymentMethod, couponId, token)
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.post(`${SERVER_URI}/orders`, { cartId, deliveryAddress, paymentMethod, couponId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.data.success){
        return response.data.order;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error creating order");
    }
  }
);