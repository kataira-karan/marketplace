import React from "react";
import "./MessageStyle.css";
import { format } from "timeago.js";

const Message = ({ own, message, otherUser, globalUser }) => {
  return (
    <div className={own ? "message-container own" : "message-container"}>
      <div className={own ? "message-top own-message-top" : "message-top"}>
        {/* <img
          className="message-image"
          src={
            own
              ? globalUser.avatarString
                ? require(`../../Static/uploads/${globalUser.avatarString}`)
                : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              : globalUser.avatarString
              ? require(`../../Static/uploads/${otherUser.avatarString}`)
              : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          }
        ></img> */}
        <img
          className="message-image"
          src={own ? globalUser.avatarString : otherUser.avatarString}
        ></img>

        <p className={own ? "message-text own-text" : "message-text"}>
          {message.text}
        </p>
      </div>

      <div className="message-bottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
