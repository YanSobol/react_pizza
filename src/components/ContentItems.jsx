import React from "react";
import PizzaBlock from "./PizzaBlock";

const ContentItems = ({ category, pizzas }) => {
  return (
    <div className="content__items">
      {pizzas
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
