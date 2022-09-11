import "./App.css";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import ContentItems from "./components/ContentItems";
import { useState } from "react";

function App() {
  const [activeCategory, setActiveCategory] = useState(0);
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
          <ContentItems category={activeCategory} />
        </div>
      </div>
    </div>
  );
}

export default App;
