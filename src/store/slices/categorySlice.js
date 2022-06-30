import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getCategoryWords } from "../actions/categoryActions";

const initialState = {
  categories: [],
  loading: "idle",
  error: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = "success";
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});

const initialWordState = {
  words: [],
  loading: "idle",
  error: null,
};

export const categoryWordSlice = createSlice({
  name: "category",
  initialState: initialWordState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryWords.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getCategoryWords.fulfilled, (state, action) => {
        state.loading = "success";
        state.words = action.payload;
      })
      .addCase(getCategoryWords.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});
