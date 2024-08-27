import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri'; // Asegúrate de reemplazar esto con la ruta a tu archivo de constantes
import { _retrieveData } from '@/utils/util'; // Asegúrate de reemplazar esto con la ruta a tu función de almacenamiento
import { Toast } from "react-native-toast-notifications";

export const createPaymentIntent = createAsyncThunk('payment/createPaymentIntent', async({totalUsd, customerEmail}: {totalUsd:number, customerEmail:string}, { rejectWithValue })=>{
try {
    const token = await _retrieveData({ key: "userToken" });
    if (!token) {
      return rejectWithValue("No token found");
    }
    const response = await axios.post(`${SERVER_URI}/payments`, { totalUsd, customerEmail }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.data.success){
      Toast.show("Orden creada exitosamente", { type: "success" });
      return response.data.order;
    } else {
      return rejectWithValue(response.data.message);
    }

} catch (error) {
    console.error(error);
    return rejectWithValue("Error creating order");
}
})