const express = require("express");
const messageRoute = express.Router();
const Message = require("../models/MessageModel");
const {
  postMessage,
  getConvesation,
} = require("../controllers/messagesController");

// create new message and save

messageRoute.post("/", postMessage);
messageRoute.get("/:conversationId", getConvesation);

// get all the messages send by the user

module.exports = messageRoute;
