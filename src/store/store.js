import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { categorySlice, categoryWordSlice } from "./slices/categorySlice";
import { wordSlice } from "./slices/wordSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    categories: categorySlice.reducer,
    categoryWords: categoryWordSlice.reducer,
    wordDetails: wordSlice.reducer,
  },
});

export default store;
