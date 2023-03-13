import { React, useEffect, useState, useContext } from "react";
import Navigation from "../../Component/Navigation/Navigation";
import "./PreviewProductStyle.css";
import { useParams, useHistory, Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { MdFavorite } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";

const PreviewProduct = () => {
  const params = useParams();
  const history = useHistory();
  const [item, setitem] = useState();
  const [conversation, setconversation] = useState();
  const [newMessage, setnewMessage] = useState("");
  const [globalUser] = useContext(UserContext);
  const [openChatOption, setopenChatOption] = useState(false);
  const [isFav, setisFav] = useState(false);

  const getProductById = async () => {
    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      Body: JSON.stringify(params.productId),
    };

    console.log(globalUser);
    let senderId;
    if (globalUser === null) {
      senderId = "null";
    } else {
      senderId = globalUser._id;
    }

    // let userId = ` {${globalUser} !== null ? ${globalUser._id} : "" }`;
    console.log(senderId);

    // handling get request using ItemID
    await fetch(
      `http://localhost:8080/listing/${params.productId}/${senderId}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setitem(data.item);
        if (globalUser === null) {
          return;
        } else {
          if (data.conversation.length > 0) {
            setopenChatOption(true);
            setconversation(data.conversation[0]);
          }
        }

        if (data.isFav) {
          setisFav(true);
        }
        // checkIfConversationAvailable();
      });
  };
  const sendAMessageToSeller = async (e) => {
    e.preventDefault();
    if (globalUser === null) {
      history.push("/login");
      return;
    }

    const bodyObject = {
      senderId: globalUser._id,
      receiverId: item.addedBy._id,
      textMessage: newMessage,
    };

    const requestOptions = {
      crossDomain: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObject),
    };

    try {
      await fetch(
        `http://localhost:8080/conversation/sendmessage`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.succes) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const setMessageWithPrice = (e, precentage) => {
    let price = item.price - (precentage * item.price) / 100;
    console.log(item.price - (precentage * Number(item.price)) / 100);
    setnewMessage(
      `Hey ${item.addedBy.name},I am intrested in ${precentage}% lower price at ${price}$ `
    );
  };
  // adding product to fav
  const addToFavorite = async () => {
    const requestOptions = {
      crossDomain: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: globalUser._id,
        productId: item._id,
        product: item,
      }),
    };

    try {
      await fetch(`http://localhost:8080/users/addfavorite`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // check if the product is fav or not
  const checkIfProductIsFavorite = async () => {
    const requestOptions = {
      crossDomain: true,
      method: "GET",
    };

    try {
      await fetch(
        `http://localhost:8080/listing/isproductfavorite`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          if (data.success) {
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getProductById();
  }, [isFav]);

  return (
    <>
      <Navigation></Navigation>
      {item ? (
        <div className="preview-product-container">
          <div className="preview-product-image-container">
            {/* <img
              className="preview-product-image"
              src={require(`../../Static/itemImages/${item.itemImageString}`)}
            ></img> */}

            <img
              className="preview-product-image"
              alt="product-image"
              src={item.itemImageString}
            ></img>
          </div>

          <div className="gap"></div>

          <div className="preview-product-content">
            <div className="preview-product-content-header">
              <span className="preview-product-content-title">
                {item.title}
              </span>
              {isFav ? (
                <span
                  className="preview-product-save-button"
                  onClick={addToFavorite}
                >
                  {" "}
                  {/* using react-icon for icons */}
                  <MdFavorite
                    class="fav-product"
                    style={{ color: "red" }}
                  ></MdFavorite>{" "}
                </span>
              ) : (
                <span
                  className="preview-product-save-button"
                  onClick={addToFavorite}
                >
                  {" "}
                  <GrFavorite></GrFavorite>{" "}
                </span>
              )}
            </div>

            <div className="  preview-product-content-price">{item.price}</div>
            <div className="preview-product-content-description">
              {item.description}
            </div>

            <div className="preview-product-content-key-value">
              <span className="preview-product-field">Condition</span>
              <span className="preview-product-value">{item.condition}</span>
            </div>

            <div className="preview-product-content-key-value">
              <span className="preview-product-field">Category</span>
              <span className="preview-product-value">{item.category}</span>
            </div>

            <hr />

            <div className="preview-product-seller-information-container">
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                }}
              >
                Seller information
              </span>

              <div className="preview-product-seller-information">
                <div className="preview-product-seller-photo-container">
                  {item.addedBy.avatarString === null ? (
                    <img
                      className="preview-product-seller-photo"
                      alt="seller-photo"
                      src={require(`../../Static/uploads/${item.addedBy.avatarString}`)}
                    ></img>
                  ) : (
                    <img
                      className="preview-product-seller-photo"
                      alt="seller-photo"
                      src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                    ></img>
                  )}
                </div>

                <div
                  className="preview-product-seller-name"
                  style={{ paddingLeft: "1rem" }}
                >
                  {item.addedBy.name}
                </div>
              </div>
            </div>

            {globalUser ? (
              globalUser._id === item.addedBy._id ? null : openChatOption ? (
                <button className="open-chat-button">
                  {" "}
                  <Link to={`/userprofile/messenger/`}> Open Chat </Link>
                </button>
              ) : !item.isDonation ? (
                // if the item is for danation
                <div className="preview-product-send-message-section">
                  <div className="send-offer-container">
                    <span> Send seller an Offer</span>
                    <div>
                      <button
                        className="offer-button"
                        onClick={(e) => setMessageWithPrice(e, 15)}
                      >
                        {" "}
                        {item.price - (15 * item.price) / 100}$ (15% lower)
                      </button>
                      <button
                        className="offer-button"
                        onClick={(e) => setMessageWithPrice(e, 10)}
                      >
                        {" "}
                        {item.price - (10 * item.price) / 100}$ (10% lower)
                      </button>
                      <button
                        className="offer-button"
                        onClick={(e) => setMessageWithPrice(e, 5)}
                      >
                        {" "}
                        {item.price - (5 * item.price) / 100}$ (5% lower)
                      </button>
                    </div>
                  </div>

                  <hr></hr>

                  {/* <button>{item.price - 20}</button> */}

                  <label htmlFor="preview-product-message-input">
                    {" "}
                    Send seller a message
                  </label>

                  <input
                    className="preview-product-message-input"
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setnewMessage(e.target.value);
                    }}
                  ></input>

                  <button
                    className="preview-product-send-message-button"
                    onClick={(e) => sendAMessageToSeller(e)}
                  >
                    {" "}
                    Send message{" "}
                  </button>
                </div>
              ) : null
            ) : null}
            <div>
              <button className="preview-product-send-message-button">
                <Link
                  to={{
                    pathname: "/buy/product/stripeForm",
                    state: { product: item, userId: globalUser._id },
                  }}
                >
                  {" "}
                  Buy Now{" "}
                </Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default PreviewProduct;
