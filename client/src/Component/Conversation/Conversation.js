import { React, useEffect, useContext, useState } from "react";
import "./ConversationStyle.css";
import { UserContext } from "../../Context/userContext";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setuser] = useState(null);

  const getOtherUserData = async (recivedId) => {
    const requestOptions = {
      crossDomain: true,
      method: "GET",
    };

    try {
      await fetch(
        `http://localhost:8080/users/getUserData/${recivedId}`,
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setuser(data.response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getting id of other user
    const recivedId = conversation.members.find(
      (otherUserId) => otherUserId !== currentUser._id
    );

    getOtherUserData(recivedId);
  }, []);

  return (
    <>
      {user ? (
        <div className="conversation-container">
          {/* <img
            className="conversation-profile-pic"
            src={
              user.avatarString
                ? require(`../../Static/uploads/${user.avatarString}`)
                : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            }
          ></img> */}
          <img
            className="conversation-profile-pic"
            src={user.avatarString}
          ></img>

          <span className="conversation-user-name">{user.name}</span>
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Conversation;
