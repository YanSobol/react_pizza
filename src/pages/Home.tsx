import React, { useCallback, useEffect } from "react";
import Categories from "../components/Categories";
import Sort from "../components/sort/Sort";
import PizzaBlockSkeleton from "../components/pizzaBlock/PizzaBlockSkeleton";
import ContentItems from "../components/ContentItems";
import Search from "../components/search/Search";
import Pagination from "../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas, pizzaSelector } from "../redux/slices/pizzaSlice";
import { filterSelector } from "../redux/slices/filterSlice";

type IPizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { sort, search, category, currentPage, itemsPerPage } =
    useSelector(filterSelector);

  const { items, status } = useSelector(pizzaSelector);
  const getPizzas = useCallback(async () => {
    // @ts-ignore
    dispatch(fetchPizzas());
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    getPizzas().then();
    window.scrollTo(0, 0);
  }, [category, sort, currentPage, search, itemsPerPage, getPizzas]);

  const pizzas: IPizza[] = items.map((item: any) => {
    return {
      id: item.id,
      imageUrl: item.imageUrl,
      title: item.title,
      types: item.types,
      sizes: item.sizes,
      price: item.price,
    };
  });

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
        <ContentItems pizzas={pizzas} />
      )}
      <Pagination />
    </>
  );
};

export default Home;
