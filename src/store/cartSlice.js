import { createSlice } from "@reduxjs/toolkit";

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
          item.id === action.payload.data.id &&
          item.price === action.payload.data.price
      );
      if (item) {
        item.amount -= 1;
      }
      state.totalPrice -= action.payload.data.price;
      state.totalAmount -= 1;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

const abc = [
  { id: 3, data: "sdfs" },
  { id: 4, data: "sdffs" },
];
