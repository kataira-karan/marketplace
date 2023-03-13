import React from "react";
import { Redirect, Link, useHistory } from "react-router-dom";
import "./SellingPageItemCard.css";

const SellingPageItemCard = (props) => {
  const history = useHistory();
  const {
    _id,
    title,
    price,
    category,
    itemImageString,
    description,
    condition,
    isDraft,
    isActive,
    isSold,
  } = props.product;

  const goToCreatListingPage = () => {
    console.log("redirect");
    <Redirect to="/ userprofile/createlisting"></Redirect>;
  };

  const deletePosting = async (e) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete " + title
    );

    if (confirmDelete) {
      console.log("deleteing");
      const requestOptions = {
        crossDomain: true,
        mode: "cors",
        method: "DELETE",
      };
      await fetch(
        `http://localhost:8080/listing/deletelisting/${_id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // setuserListing(data.response.listedProducts);
          return history.push("/userprofile");
        });
    } else {
      return;
    }
  };

  const markItemAsSoldOut = async (e) => {
    let confirm = window.confirm(
      "Are you sure you want to mark" + title + "as sold out?"
    );

    if (confirm) {
      const requestOptions = {
        crossDomain: true,
        mode: "cors",
        method: "GET",
      };
      await fetch(
        `http://localhost:8080/listing/item/sold/${_id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // setuserListing(data.response.listedProducts);
          console.log(data);
          window.location.reload();
          // return history.push("/");
        });
    } else {
      return;
    }
  };

  const repostItem = async (e) => {
    let confirm = window.confirm("Are you sure you want to repost" + title);

    if (confirm) {
      const requestOptions = {
        crossDomain: true,
        mode: "cors",
        method: "GET",
      };
      await fetch(
        `http://localhost:8080/listing/item/repost/${_id}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // setuserListing(data.response.listedProducts);
          console.log(data);
          window.location.reload();
          // return history.push("/");
        });
    } else {
      return;
    }
  };

  return (
    <div className="selling-page-item-card-container">
      <div className="selling-page-item-card-image-container">
        {/* <img
          className="selling-page-item-card-image"
          src={require(`../../Static/itemImages/${itemImageString}`)}
        ></img> */}

        <img
          className="selling-page-item-card-image"
          src={itemImageString}
        ></img>
      </div>

      <div className="selling-page-item-card-information">
        <div className="selling-page-item-card-title">{title}</div>
        <div className="selling-page-item-card-price">{price}$</div>
        <div className="selling-page-item-card-price">{description}$</div>
        <div className="selling-page-item-card-status">
          {isDraft ? "Drafted" : isSold ? "Sold Out" : "Available To Buy"}
          {/* {isActive ? "Active" : "Sold Out"} */}
        </div>

        {/* card buttons */}
        <div className="selling-page-item-card-buttons">
          {/* if the item is drafed give option to continue editing the item */}
          {isDraft ? (
            <button className="mark-as-available-option">
              <Link to={`/drafts/${_id}`}> Continue</Link>
            </button>
          ) : null}
          {/* delete posting */}
          <button
            className="mark-as-available-option"
            onClick={(e) => deletePosting(e)}
          >
            Delete Posting
          </button>

          {/* if the item is sold out give option to repost the item */}
          {isSold ? (
            <button className="mark-as-available-option" onClick={repostItem}>
              Repost Item
            </button>
          ) : null}

          {/* if the item is active , not soldout and not drafted give this option */}
          {!isSold && !isDraft ? (
            <>
              <button className="mark-as-available-option">
                <Link to={`/edit/${_id}`}> Edit </Link>
              </button>

              <button
                className="mark-as-available-option"
                onClick={markItemAsSoldOut}
              >
                Mark As Sold
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SellingPageItemCard;
