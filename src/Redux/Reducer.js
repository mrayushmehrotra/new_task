import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const addToCart = createAction("addToCart");
const removeFromCart = createAction("removeFromCart");

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      state.cart.push(action.payload);
    })

    .addCase(removeFromCart, (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.index !== action.payload.index
      );
    });
});
