import React from "react";
import PizzaBlock from "./PizzaBlock";
import { pizzaDB } from "../data/pizzas";

const ContentItems = ({ category }) => {
  return (
    <div className="content__items">
      {pizzaDB.pizzas
        .filter((pizza) => {
          if (category === 0) return pizza;
          return pizza.category === category;
        })
        .map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} />
        ))}
    </div>
  );
};

export default ContentItems;
