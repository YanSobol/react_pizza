import PizzaBlock from "./pizzaBlock/pizzaBlock";
import { Link } from "react-router-dom";
import React from "react";

type IPizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

const ContentItems: React.FC<{ pizzas: IPizza[] }> = ({ pizzas }) => {
  return (
    <div className="content__items">
      {pizzas.map((pizza: IPizza) => (
        <Link to={`pizza/${pizza.id}`} key={pizza.id}>
          <PizzaBlock {...pizza} />
        </Link>
      ))}
    </div>
  );
};

export default ContentItems;
