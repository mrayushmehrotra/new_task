// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./paginationSlice";
import categoryReducer from "./CategorySlice";

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    categories: categoryReducer,
  },
});
