import { configureStore } from "@reduxjs/toolkit";
import { userSlice, userUpdateSlice } from "./slices/userSlice";
import { categorySlice, categoryWordSlice } from "./slices/categorySlice";
import { wordSlice } from "./slices/wordSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
    categories: categorySlice.reducer,
    categoryWords: categoryWordSlice.reducer,
    wordDetails: wordSlice.reducer,
  },
});

export default store;
