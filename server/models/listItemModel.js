const mongoose = require("mongoose");

const listItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Name can not be empty"],
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "category can not be empty"],
  },
  price: {
    type: String,
    required: [true, "price can not be empty"],
  },
  itemImageString: String,
  description: {
    type: String,
    required: [true, "description can not be empty"],
  },
  condition: {
    type: String,
    required: [true, "Condition can not be empty"],
  },
  isDonation: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  isDraft: {
    type: Boolean,
  },

  isSold: {
    type: Boolean,
  },

  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("listItem", listItemSchema);
