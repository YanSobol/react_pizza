import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sort: "",
  search: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCategory: (state, value) => {
      console.log("Category reducer: ", value.payload);
      state.category = value.payload;
    },
    changeSort: (state, value) => {
      console.log("Sort reducer: ", value.payload);
      state.sort = value.payload;
    },
    changeSearch: (state, value) => {
      console.log("Search reducer: ", value.payload);
      state.search = value.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeCategory, changeSort, changeSearch } = filterSlice.actions;

export default filterSlice.reducer;
