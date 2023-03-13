import { React, useEffect, useState } from "react";
import Navigation from "../../Component/Navigation/Navigation";
import { useParams } from "react-router-dom";
import ProductCard from "../../Component/ProductCard/ProductCard";
import "./ProductsByCategoryStyle.css";
import Header from "../../Component/Header/Header";
import CategoryNavigation from "../../Component/CategoryNavigation/CategoryNavigation";

const ProductsByCategory = () => {
  const [categorizedProduct, setcategorizedProduct] = useState();
  const params = useParams();
  console.log(params);
  const [categoryType, setcategoryType] = useState("");

  const getListingByCategory = async () => {
    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "GET",
    };
    await fetch(
      `http://localhost:8080/listing/category/${params.categoryType}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setcategorizedProduct(data.items);
      });
  };

  // whenever category type changes in params in url, this page will rediect and send request to the server to fetch the data
  useEffect(() => {
    getListingByCategory();
  }, [params.categoryType]);

  return (
    <>
      <Navigation></Navigation>
      <CategoryNavigation></CategoryNavigation>
      <div className="products-by-category-container">
        {/* <span className="products-by-category-header">
          {params.categoryType}
        </span> */}

        <Header
          content={params.categoryType}
          width="90%"
          borderRadius="10px"
          fontWeight="bold"
          padding="1.5rem"
          backgroundColor="#F0F2F5"
          fontSize="2rem"
        ></Header>

        <div className="products-by-category">
          {categorizedProduct
            ? categorizedProduct.map((product) => {
                return <ProductCard item={product}></ProductCard>;
              })
            : "Loading"}
        </div>
      </div>
    </>
  );
};

export default ProductsByCategory;
