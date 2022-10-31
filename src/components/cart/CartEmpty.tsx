import React from "react";
import { Link } from "react-router-dom";
import cartEmptyImage from "../../assets/images/empty-cart.png";

const CartEmpty: React.FC = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h1>🫠</h1>
          <h2>Your cart is empty</h2>
          <p>
            You probably haven't ordered pizza yet.
            <br />
            To order pizza, go to the main page.
          </p>
          <img src={cartEmptyImage} alt="Empty cart" />
          <Link to="/" className="button button--black">
            <span>Go back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
