import { React, useState, useContext, useEffect } from "react";
import "./UserProfileSidebar.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const UserProfileSidebar = () => {
  const [globalUser, setglobalUser] = useContext(UserContext);
  const [avatarPath, setavatarPath] = useState(null);
  const [isEditPhotoMode, setisEditPhotoMode] = useState(false);

  const [fileInputState, setfileInputState] = useState("");
  const [selectedFile, setselectedFile] = useState("");
  // const dp = require(`../../Static/uploads/${globalUser.avatarString}`);

  const uploadAvatar = async (e) => {
    e.preventDefault();
    // console.log(avatarPath);
    console.log("upladoign");
    const formData = new FormData();

    formData.append("avatar", avatarPath);
    formData.append("_id", globalUser._id);
    const requestOptions = {
      crossDomain: true,
      method: "POST",
      body: formData,
    };

    await fetch("http://localhost:8080/users/uploadAvatar", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.updatedUser);
        // setglobalUser(data.updatedUser);
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
        window.location.reload();
      });
  };

  const editProfilePhoto = () => {
    setisEditPhotoMode(true);
  };

  const handleFileChnage = (event) => {
    const file = event.target.files[0];
    setavatarPath(file);
  };

  useEffect(() => {
    // console.log(`../../Static/uploads/${globalUser.avatarString}`);
    // console.log(globalUser.avatarString);
  }, []);
  return (
    <div className="userprofile-sidebar-container">
      <section className="profile-photo-section">
        <div className="user-profile-section">
          <div className="user-info">
            <div className="image-section">
              {globalUser.avatarString ? (
                <>
                  {/* <img
                    id="avtar-image"
                    src={require(`../../Static/uploads/${globalUser.avatarString}`)}
                  ></img> */}

                  <img
                    id="avtar-image"
                    alt="user-profile-photo"
                    src={globalUser.avatarString}
                  ></img>

                  <button
                    className="edit-profile-photo-button"
                    onClick={editProfilePhoto}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <form
                  onSubmit={uploadAvatar}
                  method="POST"
                  encType="multipart/form-data"
                  className="avatar-form"
                >
                  <input
                    name="avatar"
                    type="file"
                    id="avatar"
                    required
                    onChange={(event) => handleFileChnage(event)}
                  />

                  <label htmlFor="avatar" id="avatar-text">
                    {" "}
                    Upload Image
                  </label>
                  <input type="submit" className="upload-image-button" />
                </form>
              )}

              {isEditPhotoMode ? (
                <form
                  onSubmit={uploadAvatar}
                  method="POST"
                  encType="multipart/form-data"
                  className="avatar-form"
                >
                  <input
                    name="avatar"
                    type="file"
                    id="avatar"
                    required
                    onChange={(event) => handleFileChnage(event)}
                  />

                  <label htmlFor="avatar" id="avatar-text">
                    {" "}
                    Upload Image
                  </label>
                  <input type="submit" className="upload-image-button" />
                </form>
              ) : (
                ""
              )}
            </div>

            {/* <img src={Pic}></img> */}
          </div>
          {/* <div> {globalUser.name} das</div> */}
        </div>
      </section>

      <section className="sidebar-links">
        <ul className="sidebar-list">
          <li className="sidebar-user-name"> Hello {globalUser.name}.! </li>
          <li className="sidebar-list-item"> Buying </li>
          <li className="sidebar-list-item">
            {" "}
            <Link to="/userprofile/selling"> Selling </Link>{" "}
          </li>

          <li className="sidebar-list-item">
            <Link to="/userprofile/messenger">Messenger</Link>
          </li>

          <li className="sidebar-list-item">
            {" "}
            <Link to="/userprofile/createlisting"> Create Listing </Link>
          </li>
          <li className="sidebar-list-item">
            {" "}
            <Link to="/userprofile/favorites"> Favorites</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UserProfileSidebar;
