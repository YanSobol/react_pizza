import React, { useCallback, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import { useSelector } from "react-redux";
import { fetchPizzas, pizzaSelector } from "../redux/slices/pizzaSlice";
import { filterSelector } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sort, search, category, currentPage, itemsPerPage } =
    useSelector(filterSelector);

  const { items, status } = useSelector(pizzaSelector);
  const getPizzas = useCallback(async () => {
    dispatch(fetchPizzas());
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    getPizzas().then();
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
        <ContentItems pizzas={items} />
      )}
      <Pagination />
    </>
  );
};

export default Home;
