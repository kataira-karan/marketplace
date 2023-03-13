const express = require("express");
const multer = require("multer");
const path = require("path");
const listingRouter = express.Router();
const {
  addNewListing,
  getAllListing,
  getItemById,
  getListing,
  updateItem,
  deleteListing,
  saveItemAsDraft,
  isProductFavorite,
  markAsSoldOut,
  repostItem,
} = require("../controllers/itemController");

//
const listingItemStorgae = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/src/Static/itemImages"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: listingItemStorgae });

listingRouter.post("/addlisting", upload.single("itemImage"), addNewListing);
listingRouter.get("/getalllisting", getAllListing);
listingRouter.get("/category/:category", getListing);
listingRouter.get("/:listingId/:senderId", getItemById);
listingRouter.post("/updateItem", upload.single("itemImage"), updateItem);
listingRouter.delete("/deletelisting/:listingId", deleteListing);
listingRouter.post(
  "/saveItemAsDraft",
  upload.single("itemImage"),
  saveItemAsDraft
);

listingRouter.get("/isproductfavorite", isProductFavorite);
listingRouter.get("/item/sold/:_id", markAsSoldOut);
listingRouter.get("/item/repost/:_id", repostItem);
module.exports = listingRouter;
