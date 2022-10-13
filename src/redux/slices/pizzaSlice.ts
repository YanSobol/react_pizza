import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export enum Status {
  LOADING = "loading",
  SUCCESS = "fulfilled",
  ERROR = "rejected",
}

export type Pizza = {
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
  status: Status;
}

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  undefined,
  { state: RootState }
>("pizza/fetchPizzas", async (arg, thunkAPI) => {
  const url = `https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?`;
  const { category, sort, search, currentPage, itemsPerPage } =
    thunkAPI.getState().filter;
  const { data } = await axios.get<Pizza[]>(url, {
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
  status: Status.LOADING,
};
export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});
export const pizzaSelector = (rootState: RootState) => rootState.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
