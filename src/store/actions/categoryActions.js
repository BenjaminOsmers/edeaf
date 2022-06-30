import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/all",
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token.access_token}`,
        },
      };

      const { data } = await axios.get(
        "https://edeaf-api-staging.azurewebsites.net/v1/admin/categories",
        config
      );

      return data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      console.log(error.response.data);

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategoryWords = createAsyncThunk(
  "category/words",
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        user: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token.access_token}`,
        },
      };

      const { data } = await axios.get(
        `https://edeaf-api-staging.azurewebsites.net/v1/admin/Categories/${id}`,
        config
      );

      data.data.words.sort((a, b) => a.name.localeCompare(b.name));

      return data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      console.log(error.response.data);

      return rejectWithValue(error.response.data.message);
    }
  }
);
