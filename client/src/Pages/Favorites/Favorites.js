import { React, useState, useEffect, useContext } from "react";
import Header from "../../Component/Header/Header";
import Navigation from "../../Component/Navigation/Navigation";
import ProductCard from "../../Component/ProductCard/ProductCard";
import { UserContext } from "../../Context/userContext";
import "./FavoritesStyle.css";

const Favorites = () => {
  const [globalUser, setglobalUser] = useContext(UserContext);
  const [favoriteProducts, setfavoriteProducts] = useState(null);

  const getFavorites = async () => {
    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "GET",
    };
    await fetch(
      `http://localhost:8080/users/${globalUser._id}/getfavorites`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setfavoriteProducts(data.response);
      });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <Navigation></Navigation>
      <div className="favorite-container">
        <Header
          content="Your Favorite Products"
          width="90%"
          borderRadius="10px"
          fontWeight="bold"
          padding="1.5rem"
          backgroundColor="#F0F2F5"
          fontSize="2rem"
        ></Header>

        <div className="fav-products">
          {favoriteProducts ? (
            favoriteProducts.length === 0 ? (
              <h1> You do not have any favorite Items</h1>
            ) : (
              favoriteProducts.map((product) => {
                return <ProductCard item={product}></ProductCard>;
              })
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Favorites;
