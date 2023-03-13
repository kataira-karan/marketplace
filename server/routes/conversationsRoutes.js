const express = require("express");
const conversationRouter = express.Router();
const Conversation = require("../models/ConvesationModel");
var Filter = require("bad-words");
const Message = require("../models/MessageModel");

// new conv
conversationRouter.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();

    res.status(200).json({ success: true, conversation: savedConversation });
  } catch (error) {
    res.status(500).json({ success: true, error: error });
  }
  newConversation.save();
});

// get conv of user
conversationRouter.get("/:userId", async (req, res) => {
  console.log(req.params);
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    console.log(`conversation : ${conversation}`);
    res.status(200).json({
      succes: true,
      message: "Conversation found",
      conversation: conversation,
    });
  } catch (error) {
    res.status(500).json({ succes: false, message: error });
  }
});

conversationRouter.post("/sendmessage", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();

    filter = new Filter();
    const newMessage = {
      conversationId: savedConversation._id,
      sender: req.body.senderId,
      text: filter.clean(req.body.textMessage),
    };
    console.log(savedConversation);
    const message = new Message(newMessage);
    console.log(newMessage);
    console.log(message);
    try {
      const savedMessage = await message.save();
      console.log(savedMessage);
      res.status(200).json({ succes: true, response: savedMessage });
    } catch (error) {
      res.status(500).json({ success: falses, error: error });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

conversationRouter.get("/:senderId/:recieverId", async (req, res) => {
  console.log("hleo");
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.senderId, req.params.recieverId] },
    });

    console.log(`conversation : ${conversation}`);
    if (conversation) {
      console.log(conversation);
      res.status(200).json({
        succes: true,
        message: "Conversation found",
        conversation: conversation,
      });
    } else {
      res.status(200).json({
        succes: false,
        message: "Conversation not found",
      });
    }
  } catch (error) {
    res.status(500).json({ succes: false, message: error });
  }
});
module.exports = conversationRouter;
