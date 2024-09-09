import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { _retrieveData, parseToJson } from "@/utils/util";
import { RootState } from "../store";
import { Toast } from "react-native-toast-notifications";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      const userInfo = await _retrieveData({ key: "userInfo" });
      const userJson = await parseToJson(userInfo);
      // console.log(`${SERVER_URI}/carts/${userJson?._id}`)
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.get(`${SERVER_URI}/carts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.cart)
      return response.data.cart;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error getting cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity }: { productId: string | null; quantity: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.post(
        `${SERVER_URI}/carts`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.success);
      // return response.data.cart;
      if (response.data.success) {
        const { cart } = getState() as RootState;
        const newCart = {
          ...cart,
          products: [...cart.cart.products, response.data.product],
        };
        Toast.show("Producto añadido al carrito", {type: "success"});
        return newCart;
      } else {
        Toast.show("Ha ocurrido un error, vuelve a intentar", { type: "danger" });
        return rejectWithValue("Error adding product to cart");
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error adding product to cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { productId, quantity }: { productId: string | null; quantity: number },
    { rejectWithValue, getState }
  ) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.delete(`${SERVER_URI}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId, quantity },
      });
      // console.log(response.data.cart)
      // return response.data.cart;
      const { cart } = getState() as RootState;
      const productIndex = cart.cart.products.findIndex(
        (product: Product) => product._id === productId
      );
      if (productIndex !== -1) {
        cart.cart.products.splice(productIndex, 1);
      }

      return cart;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error removing product from cart");
    }
  }
);
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await axios.delete(`${SERVER_URI}/carts/clear-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        return { products: [], totalPrice: 0 };
      } else {
        Toast.show("No se pudo limpiar el carrito", { type: "danger" });
        return rejectWithValue("Error clearing cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      Toast.show("Error al limpiar el carrito", { type: "danger" });
      return rejectWithValue("Error clearing cart");
    }
  }
);
const cartActions = { addToCart, getCart, removeFromCart, clearCart };
export default cartActions;
