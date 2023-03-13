import { React, useContext, useEffect } from "react";
import "./DraftedItemStyle.css";

import { UserContext } from "../../Context/userContext";

const DraftedItem = (props) => {
  const { itemDetail, itemImage } = props;
  const [globalUser, setGlobalUser] = useContext(UserContext);

  useEffect(() => {
    console.log(itemDetail);
  }, [itemDetail]);

  return (
    <div className="drafted-item-container">
      <div className="drafted-item-image">
        <img
          className="drafted-image"
          src="https://www.billboard.com/wp-content/uploads/2022/06/ps5-console-2022-billboard-1548.jpg"
        ></img>
      </div>

      <div className="drafted-item-details">
        <div className="drafted-item">
          {itemDetail.title === "" ? (
            <span className="title drafted"> Title </span>
          ) : (
            <span className="title preview"> {itemDetail.title} </span>
          )}
        </div>

        <div className="drafted-item">
          {itemDetail.price === "" ? (
            <span className="drafted"> Price: </span>
          ) : (
            <span className="preview"> {itemDetail.price}$ </span>
          )}
        </div>

        <div className="drafted-item">
          <span className="drafted-item-condition-title">
            {itemDetail.description === "" ? (
              <span className="drafted"> Description goes here </span>
            ) : (
              <span className="preview"> {itemDetail.description} </span>
            )}
          </span>
        </div>

        <div className="drafted-item space-between-element">
          <span className="space-between-element-title ">Condition:</span>
          <span className="space-between-element-title ">
            {itemDetail.condition}
          </span>
        </div>

        <div className="drafted-item space-between-element">
          <span className="space-between-element-title ">Category:</span>
          <span className="space-between-element-title ">
            {itemDetail.category}
          </span>
        </div>

        <div className="drafted-item">
          {itemDetail.tags === "" ? (
            <span className="drafted"> Tags </span>
          ) : (
            <span className="preview"> {itemDetail.tags} </span>
          )}
        </div>

        <hr />
        <section className="seller-information-section">
          <div className="seller-information-header heading2">
            Seller Information
          </div>

          <div className="seller-information">
            <div className="seller-image-container">
              {/* <img
                className="seller-image"
                src={
                  globalUser.avatarString
                    ? require(`../../Static/uploads/${globalUser.avatarString}`)
                    : " https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                }
              ></img> */}

              <img className="seller-image" src={globalUser.avatarString}></img>
            </div>
            <div className="seller-details weighted">{globalUser.name}</div>
          </div>
        </section>

        <button className="drafted" disabled>
          Send A message to {globalUser.name}
        </button>
      </div>
    </div>
  );
};

export default DraftedItem;
