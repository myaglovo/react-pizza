import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import cartSlice from "./cartSlice";
import pizzasSlice from "./pizzasSlice";

const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

export default store;
