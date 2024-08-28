import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URI } from "@/utils/uri";
import {
  _storeData,
  _removeData,
  _retrieveData,
  parseError,
} from "@/utils/util";
import axios from "axios";

export const get_allCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await axios.get(`${SERVER_URI}/categories`);
    //   console.log(response.data.categories);
      return response.data;
    } catch (error) {
        console.log(error);
    }
  }
);

const actions = { get_allCategories };
export default actions;