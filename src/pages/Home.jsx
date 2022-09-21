import React, { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import { useSelector } from "react-redux";

import axios from "axios";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const { sort, search, category, currentPage, itemsPerPage } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?`, {
        params: {
          p: currentPage,
          l: itemsPerPage,
          category: category || "",
          sortby: sort,
          order: "desc",
          search,
        },
      })
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, currentPage, search, itemsPerPage]);

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

      {isLoading ? (
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
