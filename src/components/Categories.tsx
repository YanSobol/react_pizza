import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categorySelector, changeCategory } from "../redux/slices/filterSlice";

const Categories: React.FC = React.memo(() => {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const category = useSelector(categorySelector);
  const dispatch = useDispatch();
  return (
    <div className="categories">
      <ul>
        {categories.map((ctgr, index) => (
          <li
            key={index}
            className={category === index ? "active" : ""}
            onClick={() => dispatch(changeCategory(index))}
          >
            {ctgr}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
