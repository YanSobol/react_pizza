import React from "react";
import PizzaBlock from "./pizzaBlock/pizzaBlock";

const ContentItems = ({ category, pizzas }) => {
  return (
    <div className="content__items">
      {pizzas.map((pizza) => (
        <PizzaBlock key={pizza.id} {...pizza} />
      ))}
    </div>
  );
};

export default ContentItems;
