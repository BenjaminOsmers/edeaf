import { createSlice } from "@reduxjs/toolkit";
import { getWordDetails } from "../actions/wordActions";

const initialWordState = {
  word: null,
  loading: "idle",
  error: null,
};

export const wordSlice = createSlice({
  name: "words",
  initialState: initialWordState,
  extraReducers: (builder) => {
    builder
      .addCase(getWordDetails.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getWordDetails.fulfilled, (state, action) => {
        state.loading = "success";
        state.word = action.payload;
      })
      .addCase(getWordDetails.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});
