import PizzaBlock from "./pizzaBlock/pizzaBlock";
import React from "react";

type IPizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

type ContentItemsProps = {
  pizzas: IPizza[];
};

const ContentItems: React.FC<ContentItemsProps> = ({ pizzas }) => {
  return (
    <div className="content__items">
      {pizzas.map((pizza: IPizza) => (
        <PizzaBlock key={pizza.id} {...pizza} />
      ))}
    </div>
  );
};

export default ContentItems;
