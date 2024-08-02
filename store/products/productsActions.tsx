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
  async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/products`);
      return response.data.products;
    } catch (error) {
        console.log(error);
    }
  }
);

export const selectProduct = createAction<string>('products/selectProduct');

export const clearSelectedProduct = createAction('products/clearSelectedProduct');

const actions = { get_allItems, selectProduct, clearSelectedProduct };
export default actions;
