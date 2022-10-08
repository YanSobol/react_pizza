import React, { useEffect, useRef, useState } from "react";
import styles from "./Sort.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeSort, filterSelector } from "../../redux/slices/filterSlice";

const Sort: React.FC = () => {
  const { sort } = useSelector(filterSelector);
  const dispatch = useDispatch();
  const sortOptions: string[] = ["rating", "price", "title", "not sorted"];
  const orderOptions: string[] = ["dec", "inc"];
  const [toggleSortPopup, setToggleSortPopup] = useState(false);
  const [toggleOrderPopup, setToggleOrderPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const popupEventListener = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setToggleOrderPopup(false);
        setToggleSortPopup(false);
      }
    };
    document.body.addEventListener("click", popupEventListener);

    return () => {
      document.body.removeEventListener("click", popupEventListener);
    };
  }, []);

  const popupState = (
    updatedSort?: string | undefined,
    updatedOrder?: string | undefined,
    type?: string
  ) => {
    console.log(type);
    type === "order"
      ? setToggleOrderPopup(!toggleOrderPopup)
      : setToggleSortPopup(!toggleSortPopup);
    if (updatedOrder) {
      dispatch(changeSort({ ...sort, order: updatedOrder }));
      setToggleOrderPopup(!toggleOrderPopup);
    }
    if (updatedSort) {
      dispatch(changeSort({ ...sort, sortBy: updatedSort }));
      setToggleSortPopup(!toggleSortPopup);
    }

    console.log(toggleSortPopup);
    console.log(toggleOrderPopup);
  };

  return (
    <div className="sort__sep" ref={sortRef}>
      <div
        className="sort__label"
        onClick={() => popupState(undefined, undefined, "sort")}
      >
        <svg
          className={toggleSortPopup ? styles.arrow__up : styles.arrow__down}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by: </b>
        <span>{sort.sortBy}</span>
      </div>
      {toggleSortPopup && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((chosenSort, index) => (
              <li
                key={index}
                className={chosenSort === sort.sortBy ? "active" : ""}
                onClick={() => popupState(chosenSort, undefined, undefined)}
              >
                {chosenSort}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/*-----------------*/}
      <div
        className="sort__label"
        onClick={() => popupState(undefined, undefined, "order")}
      >
        <svg
          className={toggleOrderPopup ? styles.arrow__up : styles.arrow__down}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Order by: </b>
        <span>{sort.order}</span>
      </div>
      {toggleOrderPopup && (
        <div className="sort__popup">
          <ul>
            {orderOptions.map((chosenOrder, index) => (
              <li
                key={index}
                className={chosenOrder === sort.order ? "active" : ""}
                onClick={() => popupState(undefined, chosenOrder)}
              >
                {chosenOrder}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
