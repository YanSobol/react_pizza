import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPizza, cartSelector } from "../../redux/slices/cartSlice";
import { Pizza } from "../../redux/slices/pizzaSlice";

const PizzaBlock: React.FC<Pizza> = (pizza: Pizza) => {
  const { id, imageUrl, title, types, sizes, price } = pizza;
  const { items } = useSelector(cartSelector);
  const pizzaTypeNames: string[] = useMemo(() => ["regular", "thin"], []);
  const [pizzaCount, setPizzaCount] = useState(0);
  const [pizzaSize, setPizzaSize] = useState(sizes[0]);
  const [pizzaType, setPizzaType] = useState(types[0]);

  const dispatch = useDispatch();

  const pizzaCountIncrease = () => {
    dispatch(
      addPizza({
        title,
        type: pizzaTypeNames[pizzaType],
        size: pizzaSize,
        imageUrl,
        price,
        count: 1,
      })
    );
  };

  useEffect(() => {
    const pizza = items.find((pizza) => {
      return (
        pizza.title === title &&
        pizza.type === pizzaTypeNames[pizzaType] &&
        pizza.size === pizzaSize
      );
    });
    pizza ? setPizzaCount(pizza.count) : setPizzaCount(0);
  }, [items, pizzaSize, pizzaType, pizzaTypeNames, title]);

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt={title + " pizza"}
        />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setPizzaType(type)}
              className={pizzaType === type ? "active" : ""}
            >
              {pizzaTypeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={size === pizzaSize ? "active" : ""}
              onClick={() => setPizzaSize(sizes[index])}
            >
              {size} cm.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">from {price} $</div>
        <button
          className="button button--outline button--add"
          onClick={pizzaCountIncrease}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          <i>{pizzaCount}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
