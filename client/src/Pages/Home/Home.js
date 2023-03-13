import { React, useEffect } from "react";
import Navigation from "../../Component/Navigation/Navigation";
import SignUp from "../SignUp/SignUp";
import Footer from "../Footer/Footer";
import "./Home.css";
import ProductCard from "../../Component/ProductCard/ProductCard";
import ProductListing from "../../Component/ProductsListing/ProductListing";
import CategoryNavigation from "../../Component/CategoryNavigation/CategoryNavigation";

const Home = () => {
  return (
    <div className="home-container">
      <Navigation></Navigation>
      <CategoryNavigation></CategoryNavigation>
      <ProductListing> </ProductListing>
      <Footer></Footer>
    </div>
  );
};

export default Home;
