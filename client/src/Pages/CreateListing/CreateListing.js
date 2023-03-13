import { React, useState, useContext, useEffect } from "react";
import CreateItemForm from "../../Component/CreateItemForm/CreateItemForm";
import DraftedItem from "../../Component/DraftedItem/DraftedItem";
import Navigation from "../../Component/Navigation/Navigation";
import "./CreateLisitingStyle.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const CreateListing = (props) => {
  const params = useParams();
  const [isDraftedItem, setisDraftedItem] = useState(false);
  const [globalUser, setGlobalUser] = useContext(UserContext);
  const [itemImage, setitemImage] = useState(null);

  const [itemDetail, setitemDetail] = useState({
    title: "",
    brand: "",
    price: "",
    category: "",
    description: "",
    tags: "",
    condition: "",
    image: null,
    imageString: "",
  });
  const getDraftedItemInfo = async () => {
    console.log("drafteds");
    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "GET",
    };
    await fetch(
      `http://localhost:8080/listing/${params.draftId}/"null"`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let draftedItem = data.item;

        setitemDetail({
          title: draftedItem.title,
          brand: draftedItem.brand,
          price: draftedItem.price,
          category: draftedItem.category,
          description: draftedItem.description,
          tags: draftedItem.tags,
          condition: draftedItem.condition,
          imageString: draftedItem.imageString,
        });
        setisDraftedItem(true);
        console.log(data);
      });
  };

  useEffect(() => {
    if (props.draft) getDraftedItemInfo();
    if (props.edit) getDraftedItemInfo();
  }, []);
  return (
    <>
      <Navigation></Navigation>
      <div className="create-listing-container">
        <div className="create-listing-inputs">
          <div className="create-listing-header">
            <div className="create-listing-info">Item For Sale </div>

            <div className="seller-information">
              {" "}
              {globalUser.name} is selling the item.
            </div>
          </div>

          <div className="selling-item-form-container">
            <CreateItemForm
              itemDetail={itemDetail}
              setitemDetail={setitemDetail}
              itemImage={itemImage}
              setitemImage={setitemImage}
              isDraftedItem={isDraftedItem}
            >
              {" "}
            </CreateItemForm>
          </div>
        </div>

        <div className="create-listing-outputs">
          <DraftedItem
            itemDetail={itemDetail}
            itemImage={itemImage}
          ></DraftedItem>
        </div>
      </div>
    </>
  );
};

export default CreateListing;
