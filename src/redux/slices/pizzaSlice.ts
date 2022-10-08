import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface IPizzaSliceState {
  items: Pizza[];
  status: string;
}

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  undefined,
  { state: RootState }
>("pizza/fetchPizzas", async (arg, thunkAPI) => {
  const url = `https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?`;
  const { category, sort, search, currentPage, itemsPerPage } =
    thunkAPI.getState().filter;
  const { data } = await axios.get(url, {
    params: {
      p: currentPage,
      l: itemsPerPage,
      category: category || "",
      sortby: sort.sortBy,
      order: sort.order,
      search,
    },
  });
  return data;
});

const initialState: IPizzaSliceState = {
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
export const pizzaSelector = (rootState: RootState) => rootState.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
