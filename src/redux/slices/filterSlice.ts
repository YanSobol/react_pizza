import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SortType = {
  sortBy: string;
  order: string;
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
    order: "desc",
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
    changeCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
      state.currentPage = 1;
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const filterSelector = (rootState: RootState) => rootState.filter;
// Action creators are generated for each case reducer function
export const { changeCategory, changeSort, changeSearch, changeCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
