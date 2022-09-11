import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://631e18c99f946df7dc3dcf55.mockapi.io/api/items")
      .then((res) => res.json())
      .then((pizzas) => {
        setItems(pizzas);
        setIsLoading(false);
      });
  }, []);

  const activeCategoryHelper = (category) => {
    setActiveCategory(category);
  };
  return (
    <>
      <div className="content__top">
        <Categories activeCategoryHelper={activeCategoryHelper} />
        <Sort />
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
    </>
  );
};

export default Home;
