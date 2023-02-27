import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async function (
    { activeCategory, page, sortBy, orderByInc, searchValue },
    { rejectWithValue, dispatch }
  ) {
    try {
      const res = await axios.get(
        `https://639b5be1d5141501975358d5.mockapi.io/pizzas?${
          activeCategory > 0 ? `category=${activeCategory}` : ""
        }&limit=5&page=${page}&sortBy=${sortBy}&order=${
          orderByInc ? "asc" : "desc"
        }&${searchValue.length > 0 ? `search=${searchValue}` : ""}`
      );
      if (res.status !== 200) {
        throw new Error("Server Error!");
      }
      const data = res.data;
      dispatch(addPizzas(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: {
    pizzas: [],
    status: null,
    error: false,
  },
  reducers: {
    addPizzas: (state, action) => {
      console.log("----", action.payload);
      state.pizzas.push(...action.payload);
    },
    removePizzas: (state, action) => {},
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "pending";
      state.error = false;
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.error = false;
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.error = true;
    },
  },
});

export const { addPizzas, removePizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
