import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SortType = {
  sortBy: "rating" | "price" | "title" | "not sorted";
  order: "dec" | "inc";
};

interface IFilterSliceState {
  category: number;
  sort: SortType;
  search: string;
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
}

const initialState: IFilterSliceState = {
  category: 0,
  sort: {
    sortBy: "not sorted",
    order: "dec",
  },
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

export const filterSelector = (rootState: RootState) => rootState.filter;
// Action creators are generated for each case reducer function
export const { changeCategory, changeSort, changeSearch, changeCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
