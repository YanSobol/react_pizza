import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza, cartSelector } from "../../redux/slices/cartSlice";

type PizzaBlockProps = {
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  imageUrl,
  title,
  types,
  sizes,
  price,
}) => {
  const { pizzas } = useSelector(cartSelector);
  const pizzaTypeNames = useMemo(
    () => ["традиционное", "тонкое", "cheesy"],
    []
  );
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
    const pizza = pizzas.find(
      (pizza: { title: string; type: string; size: number }) =>
        pizza.title === title &&
        pizza.type === pizzaTypeNames[pizzaType] &&
        pizza.size === pizzaSize
    );
    pizza ? setPizzaCount(pizza.count) : setPizzaCount(0);
  }, [pizzaSize, pizzaType, pizzaTypeNames, pizzas, title]);

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt={title + " pizza"}
      />
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
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
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
          <span>Добавить</span>
          <i>{pizzaCount}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
