import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  changeSearch,
  changeSort,
} from "../redux/slices/filterSlice";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { sort, search, category } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    let categoryReq = category ? `&category=${category}` : "";
    let sortReq = sort ? `&sortby=${sort}&order=desc` : "";

    setIsLoading(true);
    fetch(
      `https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?search=${search}&p=${currentPage}&l=5${sortReq}${categoryReq}`
    )
      .then((res) => res.json())
      .then((pizzas) => {
        setItems(pizzas);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, currentPage, search]);

  const activeCategoryHelper = (val) => {
    dispatch(changeCategory(val));
    console.log("Category:", category);
  };
  const activeSortHelper = (sort) => {
    dispatch(changeSort(sort));
  };

  return (
    <>
      <div className="content__search">
        <Search
          searchValue={search}
          setSearchValue={(value) => dispatch(changeSearch(value))}
        />
      </div>
      <div className="content__top">
        <Categories activeCategoryHelper={activeCategoryHelper} />

        <Sort activeSortHelper={activeSortHelper} />
      </div>

      <h2 className="content__title">All Pizzas</h2>

      {isLoading ? (
        <div className="content__items">
          <PizzaBlockSkeleton />
          <PizzaBlockSkeleton />
          <PizzaBlockSkeleton />
        </div>
      ) : (
        <ContentItems category={category} pizzas={items} />
      )}
      <Pagination pageCount={3} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Home;
