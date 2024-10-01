// src/redux/paginationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    page: 1,
    products: [],
    loading: false,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      if (state.page > 1) state.page -= 1;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Actions
export const { incrementPage, decrementPage, setProducts, setLoading } =
  paginationSlice.actions;

// Thunk to fetch products
export const fetchProducts = (page) => async (dispatch) => {
  const limit = 10;
  const skip = (page - 1) * limit;
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  dispatch(setLoading(true));
  try {
    const response = await axios.get(url);
    dispatch(setProducts(response.data.products));
  } catch (error) {
    console.error("Error fetching products", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default paginationSlice.reducer;
