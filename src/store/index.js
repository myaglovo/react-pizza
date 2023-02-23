import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
