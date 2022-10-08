import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { pizzaSelector } from "../redux/slices/pizzaSlice";
import React from "react";

const Pizza: React.FC = () => {
  const params = useParams();
  const { items } = useSelector(pizzaSelector);
  const pizza = items.find(
    (pizza: { id: { toString: () => string | undefined } }) =>
      pizza.id.toString() === params.id
  );

  return (
    <div className="pizza-block">
      {pizza && (
        <div>
          <h1>{pizza.title}</h1>
          <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt={pizza.title + " pizza"}
          />
          <div className="pizza-block__price">от {pizza.price} ₽</div>
        </div>
      )}
    </div>
  );
};

export default Pizza;
