import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let category = activeCategory ? `&category=${activeCategory}` : "";
    let sort = activeSort ? `&sortby=${activeSort}&order=desc` : "";

    console.log(currentPage);
    setIsLoading(true);
    fetch(
      `https://631e18c99f946df7dc3dcf55.mockapi.io/api/items?p=${currentPage}&l=5${sort}${category}`
    )
      .then((res) => res.json())
      .then((pizzas) => {
        console.log(pizzas);
        setItems(pizzas);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, currentPage]);

  const activeCategoryHelper = (category) => {
    setActiveCategory(category);
  };
  const activeSortHelper = (sort) => {
    if (sort === "цене") setActiveSort("price");
    else if (sort === "алфавиту") setActiveSort("title");
    else setActiveSort("rating");
  };

  return (
    <>
      <div className="content__search">
        <Search />
      </div>
      <div className="content__top">
        <Categories activeCategoryHelper={activeCategoryHelper} />

        <Sort activeSortHelper={activeSortHelper} />
      </div>

      <h2 className="content__title">Все пиццы</h2>

      {isLoading ? (
        <div className="content__items">
          <PizzaBlockSkeleton />
          <PizzaBlockSkeleton />
          <PizzaBlockSkeleton />
        </div>
      ) : (
        <ContentItems category={activeCategory} pizzas={items} />
      )}
      <Pagination pageCount={3} setCurrentPage={setCurrentPage} />
    </>
  );
};

export default Home;
