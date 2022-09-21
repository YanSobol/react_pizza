import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  totalCount: 0,
  totalCost: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      let change = false;
      state.pizzas = state.pizzas.map((pizza) => {
        if (pizza.title !== action.payload.title) return pizza;
        else if (pizza.type !== action.payload.type) return pizza;
        else if (pizza.size !== action.payload.size) return pizza;
        else {
          change = true;
          pizza.count++;
          return pizza;
        }
      });
      if (!change) state.pizzas.push(action.payload);

      state.totalCount++;
      state.totalCost += action.payload.price;
    },
    countIncrease: (state, action) => {
      state.pizzas = state.pizzas.map((pizza) => {
        if (pizza.title !== action.payload.title) return pizza;
        else if (pizza.type !== action.payload.type) return pizza;
        else if (pizza.size !== action.payload.size) return pizza;
        else {
          pizza.count++;
          state.totalCount++;
          state.totalCost += pizza.price;
          return pizza;
        }
      });
    },
    countDecrease: (state, action) => {
      const {title, type, size} = action.payload;
      const tempPizza = state.pizzas
          .find(pizza => pizza.title === title && pizza.type === type && pizza.size === size);
      tempPizza.count--
      state.totalCount--;
      state.totalCost -= tempPizza.price;
      if (tempPizza.count === 0) state.pizzas = state.pizzas.filter((pizza) => pizza !== tempPizza);

    },

    deletePizza: (state, action) => {
      const {title, type, size} = action.payload;
      const deletedPizza = state.pizzas.find((pizza) => {
        return (
            pizza.title === title && pizza.type === type && pizza.size === size
        );
      });
      state.totalCount -= deletedPizza.count;
      state.totalCost -= deletedPizza.price * deletedPizza.count;
      state.pizzas = state.pizzas.filter((pizza) => pizza !== deletedPizza);
    },
  },
});
export const {addPizza, deletePizza, countDecrease, countIncrease} =
    cartSlice.actions;
export default cartSlice.reducer;
