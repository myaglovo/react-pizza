import { createSlice } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice;
