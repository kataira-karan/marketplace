const listItem = require("../models/listItemModel");
const Conversation = require("../models/ConvesationModel");
const User = require("../models/userModel");
const cloudinary = require("../helper/imageUpload");

const addNewListing = async (req, res) => {
  // console.log("adding new listing", JSON.parse(req.body.itemDetail));

  const itemDetail = JSON.parse(req.body.itemDetail);
  const isDonation = req.body.isDonation;
  const isDraft = req.body.isDraft;
  const { title, brand, price, category, description, tags, condition } =
    itemDetail;

  // if the item is already just update it
  // const isItemExist = await listItem.exists({_id : req})

  // if the item is for donation it will change the price to 0
  let p;
  if (isDonation === "false") {
    p = price;
  } else {
    p = "0";
  }

  // check if its a drafted item or not
  if (isDraft === "false") {
    isActive = true;
  } else {
    isActive = false;
  }

  // getting started with cloudinary
  try {
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${title}_product`,
      width: 700,
      height: 500,
      crop: "fill",
    });

    // creating list object
    const savedlistingItem = await listItem.create({
      title,
      brand,
      price: p,
      category,
      description,
      tags,
      condition,
      addedBy: req.body._id,
      isActive: isActive,
      isDraft,
      isSold: false,
      isDonation: isDonation,
      itemImageString: cloudinaryImage.secure_url,
    });

    // if item is saved we will update the listedProduct object of user, will push new item
    // to the array
    if (savedlistingItem) {
      await User.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { listedProducts: savedlistingItem._id } }
      );

      res.status(200).json({
        success: true,
        message: "Item saved successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Item not saved successfully",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Somthing went wrong with coludinary" });
  }
};

//  FETCHING ALL THE LISTING
const getAllListing = async (req, res) => {
  try {
    const allListing = await listItem.find({ isActive: true, isSold: false });

    res.status(200).json({
      success: true,
      message: "Items fetched",
      items: allListing,
    });
  } catch (error) {
    res.send("error");
  }
};
// get listing by category
const getListing = async (req, res) => {
  try {
    const allListing = await listItem.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      message: "Items fetched",
      items: allListing,
    });
  } catch (error) {
    res.send("error");
  }
};

// get listing by id , it will also check if the logged in user has a conversation
// with the item owner, if yes then it will send the conversation too
const getItemById = async (req, res) => {
  try {
    const item = await listItem
      .findOne({ _id: req.params.listingId })
      .select("-password")
      .populate("addedBy");
    // console.log(item.populate(item.addedBy));
    if (item) {
      // console.log(item.addedBy._id.toString());

      // console.log(req.params);
      if (req.params.senderId === "null") {
        // console.log("sender is null");
        res
          .status(200)
          .json({ success: true, message: "Item Found", item: item });
      } else {
        // checking if there is any conversation with item owner and user
        try {
          // finding a conversation if there is any
          const c = await Conversation.find({
            members: {
              $eq: [req.params.senderId, item.addedBy._id.toString()],
            },
          });

          // checking if the product is in favorite array or not
          const user = await User.findOne({ _id: req.params.senderId });
          isFav = user.favoriteProducts.includes(req.params.listingId);
          // console.log(`isFav:${isFav}`);
          res.status(200).json({
            success: true,
            message: "Item Found",
            item: item,
            conversation: c,
            isFav: isFav,
          });
        } catch (error) {
          res
            .status(200)
            .json({ success: true, message: "Item Found", item: item });
        }
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Could not find the item",
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "Somthing Went Wrong" });
  }
};

// saving item as draft
const saveItemAsDraft = async (req, res) => {
  const itemDetail = JSON.parse(req.body.itemDetail);
  const { title, brand, price, category, description, tags, condition } =
    itemDetail;
  const savedlistingItem = await listItem.create({
    title,
    brand,
    price,
    category,
    description,
    tags,
    condition,
    addedBy: req.body._id,
    isDraft: true,
    itemImageString: req.file.originalname,
  });

  if (savedlistingItem) {
    await User.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { listedProducts: savedlistingItem._id } }
    );

    res.status(200).json({
      success: true,
      message: "Item saved successfully",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Item not saved successfully",
    });
  }
};

// updating item
const updateItem = async (req, res) => {
  console.log("publish drafted Item");
  // console.log(req.body);
  const { title, brand, price, category, description, tags, condition } =
    JSON.parse(req.body.itemDetail);
  // console.log(title, brand, price, category, description, condition);
  console.log(
    `title : ${title} brand : ${brand} price : ${price} category : ${category} description : ${description} tags : ${tags} condition : ${condition}`
  );
  try {
    const cloudinaryImage = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${title}_product`,
      width: 700,
      height: 500,
      crop: "fill",
    });

    const item = await listItem.find({ _id: req.body._itemId });
    // console.log(`item :${item} `);
    let itemDetail = req.body.itemDetail;
    let itemId = req.body._itemId;
    // console.log(itemId);
    // console.log(`itemId:${itemId}`);
    console.log(item);
    // console.log(`itemDetail: ${itemDetail}`);
    if (item) {
      console.log("Updating");
      const updatedItem = await listItem.findOneAndUpdate(
        { _id: itemId },
        {
          $set: {
            title,
            brand,
            price,
            category,
            description,
            itemImageString: cloudinaryImage.secure_url,
            condition,
            isDraft: false,
            isActive: true,
          },
        }
      );
      console.log(`updatedItem:${updateItem}`);
      res.status(200).json({ success: false, response: updatedItem });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

// deleting item
const deleteListing = async (req, res) => {
  console.log("deleting");

  try {
    await listItem.deleteOne({ _id: req.params.listingId });

    res.status(200).json({ success: true, response: "Item Delete " });
  } catch (error) {
    res.status(500).json({ success: false, response: error });
  }
};

const isProductFavorite = async (req, res) => {};

//  marking item as sold out
const markAsSoldOut = async (req, res) => {
  console.log(req.params);

  const { _id } = req.params;

  try {
    let updatedItem = await listItem.findOneAndUpdate(
      { _id: _id },
      { isSold: true },
      { new: true }
    );

    res.status(200).json({ success: true, reponse: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, reponse: error });
  }
};

// repost item
const repostItem = async (req, res) => {
  const { _id } = req.params;

  try {
    let updatedItem = await listItem.findOneAndUpdate(
      { _id: _id },
      { isSold: false },
      { new: true }
    );

    res.status(200).json({ success: true, reponse: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, reponse: error });
  }
};

module.exports = {
  addNewListing,
  getAllListing,
  getItemById,
  getListing,
  saveItemAsDraft,
  isProductFavorite,
  updateItem,
  deleteListing,
  markAsSoldOut,
  repostItem,
};
