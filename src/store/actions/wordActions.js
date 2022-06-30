import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getWordDetails = createAsyncThunk(
  "words/word",
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
        `https://edeaf-api-staging.azurewebsites.net/v1/Words/${id}`,
        config
      );

      const { data: videoData } = await axios.get(
        `https://edeaf-api-staging.azurewebsites.net/v1/Words/${id}/video`,
        config
      );

      const word = {
        ...data.data,
        video: videoData,
      };

      return word;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      console.log(error.response.data);

      return rejectWithValue(error.response.data.message);
    }
  }
);
