import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: 0,
    page: 1,
    sort: {
      text: "популярности",
      label: "rating",
    },
    orderBy: true,
  },
  reducers: {
    selectCategory(state, action) {
      state.category = action.payload.i;
      state.page = 1;
    },
    selectSort(state, action) {
      state.sort = {
        text: action.payload.text,
        label: action.payload.label,
      };
    },
    selectPage(state, action) {
      state.page = action.payload.page;
    },
    selectOrderBy(state, action) {
      state.orderBy = action.payload.orderBy;
    },
    setFilters(state, action) {
      state.category = +action.payload.activeCategory;
      state.page = +action.payload.page;
      state.sort = action.payload.sort;
      state.orderBy = action.payload.orderByInc;
    },
  },
});

export const {
  selectCategory,
  selectSort,
  selectPage,
  setFilters,
  selectOrderBy,
} = filterSlice.actions;

export default filterSlice.reducer;
