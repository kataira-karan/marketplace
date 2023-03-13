import { React, useEffect, useState, useContext } from "react";
import "./SellingPage.css";
import Navigation from "../../Component/Navigation/Navigation";
import SellingPageItemCard from "../../Component/SellingPageItemCard/SellingPageItemCard";
import { UserContext } from "../../Context/userContext";

const SellingPage = () => {
  const [globalUser] = useContext(UserContext);

  const [userListing, setuserListing] = useState(null);

  const getUserListing = async () => {
    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "GET",
    };
    await fetch(
      `http://localhost:8080/users/${globalUser._id}/getuserlisting/`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setuserListing(data.response.listedProducts);
        let x = data.response.listedProducts;
        console.log(x);
        console.log(data.response.listedProducts);
        console.log(userListing);
      });
  };

  useEffect(() => {
    getUserListing();
  }, []);

  return (
    <>
      <Navigation></Navigation>
      <div className="selling-page-container">
        <div className="selling-page-header">Your Listing</div>
        <div className="selling-page-sections">
          <div className="selling-page-products-section">
            {userListing === null
              ? "Loading"
              : userListing.map((product) => {
                  return (
                    <SellingPageItemCard
                      product={product}
                    ></SellingPageItemCard>
                  );
                })}
          </div>

          <div className="selling-page-product-details-section"> </div>
        </div>
      </div>
    </>
  );
};

export default SellingPage;
