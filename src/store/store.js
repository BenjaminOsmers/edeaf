import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { categorySlice, categoryWordSlice } from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    categories: categorySlice.reducer,
    categoryWords: categoryWordSlice.reducer,
  },
});

export default store;
