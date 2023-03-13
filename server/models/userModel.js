const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty"],
    },
    avatar: {
      data: Buffer,
      ContentType: String,
    },
    avatarString: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email can not be empty"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password can not be empty"],
    },

    favoriteProducts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "listItem",
    },

    listedProducts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "listItem",
    },

    purchasedItems: {
      default: [],
      type: [mongoose.Schema.Types.ObjectId],
      ref: "listItem",
    },
  },
  {
    // it will automatically gives us the createdAt and updatedAt Field.
    timeStamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
