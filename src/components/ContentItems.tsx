import PizzaBlock from "./pizzaBlock/pizzaBlock";
import React from "react";
import { Pizza } from "../redux/slices/pizzaSlice";

type ContentItemsProps = {
  pizzas: Pizza[];
};

const ContentItems: React.FC<ContentItemsProps> = ({ pizzas }) => {
  return (
    <div className="content__items">
      {pizzas.map((pizza: Pizza) => (
        <PizzaBlock key={pizza.id} {...pizza} />
      ))}
    </div>
  );
};

export default ContentItems;
