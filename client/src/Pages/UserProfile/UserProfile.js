import { React, useContext, useState, useEffect } from "react";
import Navigation from "../../Component/Navigation/Navigation";
import "./UserProfileStyle.css";
import { UserContext } from "../../Context/userContext";
import { Link } from "react-router-dom";
import UserProfileSidebar from "../../Component/UserProfileSideBar/UserProfileSidebar";
import ProductCard from "../../Component/ProductCard/ProductCard";
// import "../../../../server/uploads/c3uhsgo1vx541.jpg";

const UserProfile = () => {
  const [globalUser, setglobalUser] = useContext(UserContext);
  const [userListing, setuserListing] = useState(null);
  const [isDisplayMobileMenu, setisDisplayMobileMenu] = useState(false);
  const [purchasedItems, setpurchasedItems] = useState();

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
        setpurchasedItems(data.purchasedItems.purchasedItems);
        console.log(purchasedItems);
      });
  };
  useEffect(() => {
    getUserListing();
  }, []);

  return (
    <>
      <Navigation
        userProfile={true}
        isDisplayMobileMen={isDisplayMobileMenu}
        setisDisplayMobileMenu={setisDisplayMobileMenu}
      ></Navigation>

      <div className="user-profile-container">
        <div className="user-sidebar">
          <UserProfileSidebar></UserProfileSidebar>
        </div>

        <div className="dynamic-section">
          <div className="dynamic-seciton-user-details">
            <div className="dynamic-section-detail-card">Your Listing : 3</div>

            <div className="dynamic-section-detail-card">Active Listing :</div>

            <div className="dynamic-section-detail-card">Item Sold :</div>
            <div className="dynamic-section-detail-card">
              {" "}
              <Link to="/userprofile/messenger"> Messenger </Link>
              {/* <link to="/userprofile/messenger"></link>{" "} */}
            </div>
          </div>

          <div className="dynamic-section-selling-card">
            <div className="dynamic-section-selling-card-header">
              <span>Item Listed</span>

              <span>
                <Link to="/userprofile/selling">See All</Link>
              </span>
            </div>

            <div className="dynamic-section-selling-cards">
              {userListing
                ? userListing.map((product) => {
                    return <ProductCard item={product}></ProductCard>;
                  })
                : "You do not have any listing"}
            </div>
          </div>

          <div className="dynamic-section-selling-card">
            <div className="dynamic-section-selling-card-header">
              <span>Purchases:</span>

              <span>
                <Link to="/userprofile/selling">See All</Link>
              </span>
            </div>

            <span>
              {" "}
              {purchasedItems
                ? purchasedItems.map((product) => {
                    return <ProductCard item={product}></ProductCard>;
                  })
                : "You do not have any Purchases"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
