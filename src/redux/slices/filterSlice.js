import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sort: "all",
  search: "",
  currentPage: 1,
  itemsCount: 10,
  itemsPerPage: 4,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, value) => {
      state.category = value.payload;
      state.currentPage = 1;
    },
    changeSort: (state, value) => {
      state.sort = value.payload;
      state.currentPage = 1;
    },
    changeSearch: (state, value) => {
      state.search = value.payload;
      state.currentPage = 1;
    },
    changeCurrentPage: (state, value) => {
      state.currentPage = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCategory, changeSort, changeSearch, changeCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
