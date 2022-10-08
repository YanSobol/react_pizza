import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory, filterSelector } from "../redux/slices/filterSlice";

const Categories: React.FC = () => {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const store = useSelector(filterSelector);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={store.category === index ? "active" : ""}
            onClick={() => dispatch(changeCategory(index))}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
