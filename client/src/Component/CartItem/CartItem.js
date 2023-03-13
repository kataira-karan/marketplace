import React from "react";

const CartItem = (props) => {
  const {
    title,
    brand,
    category,
    price,
    itemImageString,
    description,
    condition,
  } = props.item;
  return (
    <div className="product-card-container">
      <div className="product-image-container">
        <img
          className="product-image"
          src={require(`../../Static/itemImages/${itemImageString}`)}
        ></img>
      </div>

      <div className="product-details">
        <span className="product-title">{title}</span>

        <span className="product-sort-description">{description}</span>

        <span className="product-price">{price}$</span>
      </div>
    </div>
  );
};

export default CartItem;
