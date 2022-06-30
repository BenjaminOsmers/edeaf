import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../actions/userActions";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  loading: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = "success";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = "success";
        state.user = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = "error";
        if (action.payload) {
          state.error = { message: action.payload };
        } else {
          state.error = { message: action.error };
        }
      });
  },
});
