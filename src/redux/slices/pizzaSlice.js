import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { url, currentPage, itemsPerPage, category, sort, search } = params;
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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
