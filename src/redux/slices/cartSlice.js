import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  totalCount: 0,
  totalCost: 0,
};

const findPizza = (state, action) => {
  const { title, type, size } = action.payload;
  return state.pizzas.find(
    (pizza) =>
      pizza.title === title && pizza.type === type && pizza.size === size
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const tempPizza = findPizza(state, action);
      tempPizza ? tempPizza.count++ : state.pizzas.push(action.payload);
      state.totalCount++;
      state.totalCost += action.payload.price;
    },

    countChange: (state, action) => {
      const tempPizza = findPizza(state, action);
      if (action.payload.method === "inc") {
        tempPizza.count++;
        state.totalCount++;
        state.totalCost += tempPizza.price;
      } else {
        tempPizza.count--;
        state.totalCount--;
        state.totalCost -= tempPizza.price;
        if (tempPizza.count === 0)
          state.pizzas = state.pizzas.filter((pizza) => pizza !== tempPizza);
      }
    },

    deletePizza: (state, action) => {
      const deletedPizza = findPizza(state, action);
      state.totalCount -= deletedPizza.count;
      state.totalCost -= deletedPizza.price * deletedPizza.count;
      state.pizzas = state.pizzas.filter((pizza) => pizza !== deletedPizza);
    },

    clearCart: (state) => {
      state.pizzas = [];
      state.totalCount = 0;
      state.totalCost = 0;
    },
  },
});
export const cartSelector = (state) => state.cart;
export const { addPizza, deletePizza, countChange, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
