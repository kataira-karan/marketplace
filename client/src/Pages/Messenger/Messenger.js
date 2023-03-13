import { React, useEffect, useState, useContext, useRef } from "react";
import "./MessengerStyle.css";
import Navigation from "../../Component/Navigation/Navigation";
import Conversation from "../../Component/Conversation/Conversation";
import Message from "../../Component/Message/Message";
import ChatOnline from "../../Component/ChatOnline/ChatOnline";
import { UserContext } from "../../Context/userContext";
import { BsMessenger } from "react-icons/bs";

const Messenger = ({ conversationId }) => {
  const [globalUser, setglobalUser] = useContext(UserContext);
  const [conversations, setconversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [currentMessages, setcurrentMessages] = useState(null);
  const [newMessage, setnewMessage] = useState("");
  const [isChatOptionOpen, setisChatOptionOpen] = useState(false);
  const [otherUser, setotherUser] = useState(null);

  const scrollRef = useRef();
  const getAllConversation = async () => {
    const requestOptions = {
      crossDomain: true,
      method: "GET",
    };
    await fetch(
      `http://localhost:8080/conversation/${globalUser._id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setconversations(data.conversation);
        console.log(data);
        console.log(conversations);
      });
  };

  // open conversations
  const openConversation = async (conversation) => {
    setcurrentChat(conversation);
    if (isChatOptionOpen) setisChatOptionOpen(false);

    // fetch data of user with whom logged in user is chatting
    const recivedId = conversation.members.find(
      (otherUserId) => otherUserId !== globalUser._id
    );

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
          // setuser(data.response);
          setotherUser(data.response);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }

    console.log(conversation);
  };

  // getting messsages for the current conversation
  const getCurrentChatMessage = async () => {
    const requestOptions = {
      crossDomain: true,
      method: "GET",
    };
    await fetch(
      `http://localhost:8080/messages/${currentChat._id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setcurrentMessages(data.response);
        // console.log(data.response);
      });
  };

  // posting message in the database
  const sendMessage = async (e) => {
    e.preventDefault();
    const messageObject = {
      conversationId: currentChat._id,
      sender: globalUser._id,
      text: newMessage,
    };
    console.log(messageObject);
    const requestOptions = {
      crossDomain: true,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageObject),
    };

    try {
      await fetch(`http://localhost:8080/messages/`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let temp = [...currentMessages, data.response];
          setcurrentMessages(temp);
          console.log(currentMessages);
          setnewMessage("");
          console.log(data.response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const openChatOption = () => {
    setisChatOptionOpen(!isChatOptionOpen);
  };

  useEffect(() => {
    // getting all the convesation on first render
    getAllConversation();
  }, []);

  useEffect(() => {
    if (currentChat) getCurrentChatMessage();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);
  return (
    <>
      <Navigation></Navigation>
      <div className="messenger-container">
        <BsMessenger
          className="open-chat-option-button"
          onClick={openChatOption}
        ></BsMessenger>

        <div
          className={
            isChatOptionOpen ? "chat-option-active" : "chat-option-inactive"
          }
        >
          {conversations
            ? conversations.map((conversation) => {
                return (
                  <div
                    onClick={() => openConversation(conversation)}
                    key={conversation._id}
                  >
                    <Conversation
                      conversation={conversation}
                      currentUser={globalUser}
                      setisChatOptionOpen={setisChatOptionOpen}
                    ></Conversation>
                  </div>
                );
              })
            : "No convesation found"}
        </div>

        <div className="chatmenu-container">
          <div className="chatmenu">
            <input
              placeholder="Search For Friend"
              className="search-from-friend-input-box"
            ></input>

            {conversations
              ? conversations.map((conversation) => {
                  return (
                    <div
                      onClick={() => openConversation(conversation)}
                      key={conversation._id}
                    >
                      <Conversation
                        conversation={conversation}
                        currentUser={globalUser}
                      ></Conversation>
                    </div>
                  );
                })
              : "No convesation found"}
          </div>
        </div>
        <div className="chatbox-container">
          <div className="chatbox">
            <div className="chatbox-top">
              {currentChat ? (
                currentMessages ? (
                  <div>
                    <>
                      <div className="chat-header">{otherUser.name}</div>

                      {currentMessages.map((message) => {
                        return (
                          <div ref={scrollRef}>
                            <Message
                              key={message._id}
                              own={message.sender === globalUser._id}
                              message={message}
                              otherUser={otherUser}
                              globalUser={globalUser}
                            >
                              {" "}
                            </Message>
                          </div>
                        );
                      })}
                    </>

                    <div className="chatbox-bottom">
                      <textarea
                        placeholder="Write Your Message here"
                        className="chatMessageInput"
                        value={newMessage}
                        onChange={(e) => setnewMessage(e.target.value)}
                      ></textarea>

                      <button
                        className="chat-submit-button"
                        onClick={(e) => sendMessage(e)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ) : null
              ) : (
                "Open a conversation to start the chat"
              )}
            </div>
          </div>
        </div>
        {/* <div className="chat-online-container">
          <div className="chatOnline">
            <ChatOnline></ChatOnline>
            <ChatOnline></ChatOnline>
            <ChatOnline></ChatOnline>
            <ChatOnline></ChatOnline>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Messenger;
