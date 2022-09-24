import React, { useCallback, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { sort, search, category, currentPage, itemsPerPage } = useSelector(
    (state) => state.filter
  );

  const { items, status } = useSelector((state) => state.pizza);

  const getPizzas = useCallback(async () => {
    dispatch(
      fetchPizzas({
        url: `https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?`,
        sort,
        category,
        search,
        itemsPerPage,
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  }, [category, currentPage, dispatch, itemsPerPage, search, sort]);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [category, sort, currentPage, search, itemsPerPage, getPizzas]);

  if (status === "rejected") {
    return <h1>Oops</h1>;
  }
  return (
    <>
      <div className="content__search">
        <Search />
      </div>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      <h2 className="content__title">All Pizzas</h2>

      {status === "loading" ? (
        <div className="content__items">
          <PizzaBlockSkeleton />
          <PizzaBlockSkeleton />
          <PizzaBlockSkeleton />
        </div>
      ) : (
        <ContentItems category={category} pizzas={items} />
      )}
      <Pagination />
    </>
  );
};

export default Home;
