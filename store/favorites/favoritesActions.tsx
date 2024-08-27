import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { _retrieveData, parseToJson } from "@/utils/util";
import { RootState } from "../store";
import { Toast } from "react-native-toast-notifications";

export const removeFromFavorites = createAsyncThunk(
    "favorites/removeFromFavorites",
    async (
      { productId }: { productId: string },
      { rejectWithValue }
    ) => {
      try {
        const token = await _retrieveData({ key: "userToken" });
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await axios.delete(
          `${SERVER_URI}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { productId }
          }
        );
  
        return response.data.favorite;
      } catch (error) {
        console.error(error);
        return rejectWithValue("Error removing from favorites");
      }
    }
  );

export const toggleFavorite = createAsyncThunk(
    "favorites/toggleFavorite",
    async (
      { productId }: { productId: string },
      { rejectWithValue }
    ) => {
      try {
        const token = await _retrieveData({ key: "userToken" });
        if (!token) {
          return rejectWithValue("No token found");
        }
  
        const response = await axios.post(
          `${SERVER_URI}/favorites`,
          { productId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data)
        if(response.data.success){
          Toast.show("Añadido a favoritos", { type: "success" });
          return response.data.favorite;
        }  
      } catch (error) {
        console.error(error);
        return rejectWithValue("Error toggling favorite");
      }
    }
  );
  
  export const getFavorites = createAsyncThunk(
    "favorites/getFavorites",
    async (_, { rejectWithValue }) => {
      try {
        const token = await _retrieveData({ key: "userToken" });
        const userInfo = await _retrieveData({ key: "userInfo" });
        const userJson = await parseToJson(userInfo);
        if (!token) {
          return rejectWithValue("No token found");
        }
        const response = await axios.get(`${SERVER_URI}/favorites/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data)
        return response.data.favorite;
      } catch (error) {
        console.error(error);
        return rejectWithValue("Error getting favorites");
      }
    }
  );
  
  const favoriteActions = { toggleFavorite, getFavorites, removeFromFavorites };
  export default favoriteActions;