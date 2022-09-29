import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async (params, thunkAPI) => {
    const url = `https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?`;
    const { category, sort, search, currentPage, itemsPerPage } =
      thunkAPI.getState()["filter"];
    const { data } = await axios.get(url, {
      params: {
        p: currentPage,
        l: itemsPerPage,
        category: category || "",
        sortby: sort,
        order: "inc",
        search,
      },
    });
    return data;
  }
);
const initialState = {
  items: [],
  status: "loading",
};
export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = "succeed";
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "rejected";
      state.items = [];
    });
  },
});
export const pizzaSelector = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
