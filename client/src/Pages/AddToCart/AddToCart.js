import React, { useEffect, useState } from "react";
import CartItem from "../../Component/CartItem/CartItem";
import Navigation from "../../Component/Navigation/Navigation";
import ProductCard from "../../Component/ProductCard/ProductCard";

const AddToCart = (props) => {
  const [cartItems, setcartItems] = useState(
    JSON.parse(localStorage.getItem("cartItem"))
  );

  useEffect(() => {}, []);

  return (
    <>
      <Navigation></Navigation>
      <div className="add-to-cart-container" style={{ display: "flex" }}>
        {cartItems.map((item) => {
          return <CartItem item={item}></CartItem>;
        })}
      </div>
      ;
    </>
  );
};

export default AddToCart;
