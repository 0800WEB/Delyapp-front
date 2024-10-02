import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri"; // Asegúrate de reemplazar esto con la ruta a tu archivo de constantes
import { _retrieveData } from "@/utils/util"; // Asegúrate de reemplazar esto con la ruta a tu función de almacenamiento
import { Toast } from "react-native-toast-notifications";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (
    {
      cartId,
      deliveryAddress,
      paymentMethod,
      couponId,
      nota,
    }: {
      cartId: string;
      deliveryAddress: string;
      paymentMethod: string;
      couponId?: string;
      nota?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const token = await _retrieveData({ key: "userToken" });

      console.log(
        cartId,
        deliveryAddress,
        paymentMethod,
        couponId,
        token,
        nota
      );
      if (!token) {
        return rejectWithValue("No token found");
      }
      const body = { cartId, deliveryAddress, paymentMethod, couponId, nota };
      console.log(body);
      const response = await axios.post(`${SERVER_URI}/orders`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        Toast.show("Orden creada exitosamente", { type: "success" });
        console.log(response);

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

export const readOrderStatus = createAsyncThunk(
  "order/readOrderStatus",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.get(`${SERVER_URI}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Data de Order: ",response.data)
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue("Error obteniendo el estado de la orden");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error obteniendo el estado de la orden");
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.get(`${SERVER_URI}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return response.data.orders;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error fetching user orders");
    }
  }
);
