import { createSlice } from "@reduxjs/toolkit";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalPrice: 0,
    totalAmount: 0,
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.data.id &&
          item.price === action.payload.data.price
      );
      if (item) {
        item.amount += 1;
      } else {
        state.items.push(action.payload.data);
      }
      state.totalPrice += action.payload.data.price;
      state.totalAmount += 1;
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id && item.price === action.payload.price
      );
      state.items = state.items.filter((pizza) => pizza !== item);
    },
    changeAmountCart: (state, action) => {
      console.log(action.payload);
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id && item.price === action.payload.price
      );
      if (item.amount === 0) {
        state.items = state.items.filter((pizza) => pizza !== item);
      }
      if (action.payload.value === "increase") {
        item.amount += 1;
        state.totalAmount += 1;
      } else {
        if (item.amount === 1) {
          state.totalAmount -= 1;
          state.items = state.items.filter((pizza) => pizza !== item);
        } else {
          item.amount -= 1;
          state.totalAmount -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.totalPrice = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, changeAmountCart } =
  cartSlice.actions;

export default cartSlice.reducer;
