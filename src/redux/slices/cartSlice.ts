import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  title: string;
  type: string;
  imageUrl: string;
  size: number;
  price: number;
  count: number;
};

interface ICartSliceState {
  items: CartItem[];
  totalCount: number;
  totalCost: number;
}

const initialState: ICartSliceState = {
  items: [],
  totalCount: 0,
  totalCost: 0,
};

const findPizza = (
  state: Draft<ICartSliceState>,
  action: PayloadAction<any>
) => {
  const { title, type, size } = action.payload;
  return state.items.find(
    (pizza) =>
      pizza.title === title && pizza.type === type && pizza.size === size
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<CartItem>) => {
      const tempPizza = findPizza(state, action);
      tempPizza ? tempPizza.count++ : state.items.push(action.payload);
      state.totalCount++;
      state.totalCost += action.payload.price;
    },

    countChange: (
      state,
      action: PayloadAction<{
        title: string;
        type: string;
        size: number;
        method: "dec" | "inc";
      }>
    ) => {
      const tempPizza = findPizza(state, action);
      if (tempPizza) {
        if (action.payload.method === "inc") {
          tempPizza.count++;
          state.totalCount++;
          state.totalCost += tempPizza.price;
        } else {
          tempPizza.count--;
          state.totalCount--;
          state.totalCost -= tempPizza.price;
          if (tempPizza.count === 0)
            state.items = state.items.filter((pizza) => pizza !== tempPizza);
        }
      }
    },

    deletePizza: (
      state,
      action: PayloadAction<{
        title: string;
        type: string;
        size: number;
      }>
    ) => {
      const deletedPizza = findPizza(state, action);
      if (deletedPizza) {
        state.totalCount -= deletedPizza.count;
        state.totalCost -= deletedPizza.price * deletedPizza.count;
        state.items = state.items.filter((pizza) => pizza !== deletedPizza);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalCost = 0;
    },
  },
});
export const cartSelector = (rootState: RootState) => rootState.cart;
export const { addPizza, deletePizza, countChange, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
