import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import "./scss/app.scss";

const Header = lazy(
  () => import(/*webpackChunkName: 'Header'*/ "./components/Header")
);
const Home = lazy(() => import(/*webpackChunkName: 'Home'*/ "./pages/Home"));
const NotFound = lazy(
  () => import(/*webpackChunkName: 'NotFound'*/ "./pages/NotFound")
);
const Cart = lazy(() => import(/*webpackChunkName: 'Cart'*/ "./pages/Cart"));
const Pizza = lazy(() => import(/*webpackChunkName: 'Pizza'*/ "./pages/Pizza"));

function App() {
  return (
    <div className="wrapper">
      <Suspense>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pizza/:id" element={<Pizza />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
