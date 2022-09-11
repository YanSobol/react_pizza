import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import ContentItems from "./components/ContentItems";

function App() {
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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories activeCategoryHelper={activeCategoryHelper} />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>

          {isLoading ? (
            <div className="content__items">
              <div className="pizza-block">
                <Loader />
              </div>
              <div className="pizza-block">
                <Loader />
              </div>
              <div className="pizza-block">
                <Loader />
              </div>
            </div>
          ) : (
            <ContentItems category={activeCategory} pizzas={items} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
