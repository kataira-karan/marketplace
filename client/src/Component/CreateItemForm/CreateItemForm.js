import { React, useContext, useState, useEffect } from "react";
import "./CreateItemFormStyle.css";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const CreateItemForm = (props) => {
  const params = useParams();
  const [globalUser, setGlobalUser] = useContext(UserContext);
  const history = useHistory();
  const { itemDetail, setitemDetail, itemImage, setitemImage, isDraftedItem } =
    props;

  const addItemInListing = async (e, isDonation, isDraft) => {
    e.preventDefault();

    if (itemDetail.price < 0) {
      alert("can not set negative price.");
      return;
    }

    // creating data for form
    const itemFormData = new FormData();
    itemFormData.append("_id", globalUser._id);
    itemFormData.append("isDonation", isDonation);
    itemFormData.append("isDraft", isDraft);
    itemFormData.append("itemImage", itemImage);
    itemFormData.append("itemDetail", JSON.stringify(itemDetail));

    console.log(itemFormData);

    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      body: itemFormData,
      // body: JSON.stringify({ _id: globalUser._id, itemDetail: itemDetail }),
    };

    await fetch("http://localhost:8080/listing/addlisting", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        history.push("/");
      });
  };

  const handleFileChange = (e) => {
    const localItemImage = e.target.files[0];
    console.log(localItemImage);
    // setitemDetail({ ...itemDetail, image: itemImage });
    setitemImage(localItemImage);
  };

  const saveAsADraft = async (e) => {
    e.preventDefault();

    const itemFormData = new FormData();
    itemFormData.append("_id", globalUser._id);
    itemFormData.append("itemImage", itemImage);
    itemFormData.append("itemDetail", JSON.stringify(itemDetail));

    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "POST",
      body: itemFormData,
    };

    await fetch("http://localhost:8080/listing/saveItemAsDraft", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        history.push("/");
      });
  };

  const publishDraftedItem = async (e) => {
    e.preventDefault();
    const itemFormData = new FormData();
    itemFormData.append("_id", globalUser._id);
    itemFormData.append("_itemId", params.draftId);
    itemFormData.append("itemImage", itemImage);
    itemFormData.append("itemDetail", JSON.stringify(itemDetail));

    const requestOptions = {
      crossDomain: true,
      mode: "cors",
      method: "POST",
      body: itemFormData,
    };

    await fetch("http://localhost:8080/listing/updateItem", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        history.push("/");
      });
  };

  useEffect(() => {
    console.log(itemDetail);
  }, [itemDetail]);

  return (
    <form encType="multipart/form-data" className="selling-item-form">
      <div className="selling-form-field">
        <label>Title:</label>
        <input
          className="selling-form-input"
          type="text"
          value={itemDetail.title}
          onChange={(e) =>
            setitemDetail({ ...itemDetail, title: e.target.value })
          }
          required
        ></input>
      </div>

      <div className="selling-form-field">
        <label>Price:</label>
        <input
          type="number"
          className="selling-form-input"
          value={itemDetail.price}
          onChange={(e) =>
            setitemDetail({ ...itemDetail, price: e.target.value })
          }
          required
        ></input>
      </div>

      <div className="selling-form-field">
        <label>Description:</label>
        <input
          type="text"
          className="selling-form-input"
          value={itemDetail.description}
          onChange={(e) =>
            setitemDetail({
              ...itemDetail,
              description: e.target.value,
            })
          }
          required
        ></input>
      </div>

      <div className="selling-form-field">
        <label>Tags:</label>
        <input
          type="text"
          className="selling-form-input"
          value={itemDetail.tags}
          onChange={(e) =>
            setitemDetail({
              ...itemDetail,
              tags: e.target.value,
            })
          }
          required
        ></input>
      </div>

      <div className="selling-form-field">
        <label for="category">Category</label>
        <select
          className="selling-form-input"
          name="category"
          id="category"
          onChange={(e) =>
            setitemDetail({ ...itemDetail, category: e.target.value })
          }
          required
        >
          <option value="electronics">electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="homegood">homegood</option>
          <option value="musicalIntruments">musicalIntruments</option>
          <option value="entertainment">entertainment</option>
          <option value="petSupplies">petSupplies</option>
          <option value="toys">toys</option>
          <option value="sports">sports</option>
        </select>
      </div>

      <div className="selling-form-field">
        <label for="condition">Condition</label>
        <select
          className="selling-form-input"
          name="condition"
          id="condition"
          onChange={(e) =>
            setitemDetail({ ...itemDetail, condition: e.target.value })
          }
          required
        >
          <option value="new">New</option>
          <option value="usedLikeNew">Used-Like New</option>
          <option value="usedGood">Used Good</option>
          <option value="usedFair">Used Fair</option>
        </select>
      </div>

      <div className="selling-form-field">
        <label htmlFor="itemImage">Upload Image</label>
        <input
          type="file"
          name="itemImage"
          id="itemImage"
          required
          onChange={(e) => handleFileChange(e)}
        ></input>
      </div>

      {isDraftedItem ? (
        <button
          className="create-item-button"
          onClick={(e) => publishDraftedItem(e)}
        >
          Publish Item
        </button>
      ) : (
        <button
          className="create-item-button"
          onClick={(e) => addItemInListing(e, false, false)}
        >
          Publish Listing
        </button>
      )}
      <button
        className="create-item-button"
        onClick={(e) => addItemInListing(e, false, true)}
      >
        {" "}
        Save As a Draft{" "}
      </button>

      <button
        className="create-item-button"
        onClick={(e) => addItemInListing(e, true, false)}
      >
        {" "}
        Publish As Donation{" "}
      </button>
    </form>
  );
};

export default CreateItemForm;
