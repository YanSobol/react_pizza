import React from "react";
import { useSelector } from "react-redux";

const Categories = ({ activeCategoryHelper }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const store = useSelector((state) => state.filter);

  const changeCategory = (index) => {
    activeCategoryHelper(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={store.category === index ? "active" : ""}
            onClick={() => changeCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
