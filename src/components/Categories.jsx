import React, { useState } from "react";

const Categories = ({ activeCategoryHelper }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const [activeCategory, setActiveCategory] = useState(0);

  const changeCategory = (index) => {
    setActiveCategory(index);
    activeCategoryHelper(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={activeCategory === index ? "active" : ""}
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
