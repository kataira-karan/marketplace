import React from "react";
import "./ChatOnlineStyle.css";

const ChatOnline = () => {
  return (
    <div className="chat-online-contianer">
      <div className="chat-online-image-container">
        <img
          className="chat-online-image"
          src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png"
        ></img>
        <div className="chat-online-badge"></div>
      </div>

      <span className="convesation-name">Demo User</span>
    </div>
  );
};

export default ChatOnline;
