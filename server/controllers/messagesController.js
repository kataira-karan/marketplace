const Message = require("../models/MessageModel");
var Filter = require("bad-words");

const postMessage = async (req, res) => {
  filter = new Filter();
  console.log(req.body);
  const newMessage = {
    conversationId: req.body.conversationId,
    sender: req.body.sender,
    text: filter.clean(req.body.text),
  };
  console.log(req.body);
  const message = new Message(newMessage);
  console.log(message);
  try {
    const savedMessage = await message.save();
    console.log(savedMessage);
    res.status(200).json({ succes: true, response: savedMessage });
  } catch (error) {
    res.status(500).json({ succes: false, message: error });
  }
};

const getConvesation = async (req, res) => {
  console.log("params");
  console.log(req.params.conversationId);
  try {
    const conversation = await Message.find({
      conversationId: req.params.conversationId,
    });
    console.log("COnvo");
    console.log(conversation);
    res.status(200).json({ succes: true, response: conversation });
  } catch (error) {
    res.status(500).json({ succes: false, message: error });
  }
};

module.exports = { postMessage, getConvesation };
