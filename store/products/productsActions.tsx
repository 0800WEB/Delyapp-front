import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URI } from "@/utils/uri";
import {
  _storeData,
  _removeData,
  _retrieveData,
  parseError,
} from "@/utils/util";
import axios from "axios";

export const get_allItems = createAsyncThunk(
  "products/getAllItems",
  async (_, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.get(`${SERVER_URI}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.products;
    } catch (error) {
        console.log(error);
    }
  }
);

export const get_SearchItem = createAsyncThunk(
  "products/getSearchItem",
  async (productName, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.get(`${SERVER_URI}/products?name=${productName?.trim()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.products)
      return {searchProducts: response.data.products};
    } catch (error) {
        console.log(error);
    }
  }
);

export const get_TopOrderedProducts = createAsyncThunk(
  "products/getTopOrderedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const token = await _retrieveData({ key: "userToken" });
      if (!token) {
        return rejectWithValue("No token found");
      }
      const response = await axios.get(`${SERVER_URI}/products/top-ordered-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
        console.log(error);
    }
  }
);

export const selectProduct = createAction<string>('products/selectProduct');

export const clearSelectedProduct = createAction('products/clearSelectedProduct');

const actions = { get_allItems, selectProduct, clearSelectedProduct, get_SearchItem, get_TopOrderedProducts };
export default actions;
