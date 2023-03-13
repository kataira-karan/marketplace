const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerUser,
  loginUser,
  getCurrentLoggedInUser,
  uploadAvatar,
  getUserData,
  publishDraftedItem,
  getUserListing,
  addFavorite,
  getFavorite,
} = require("../controllers/userControllers");
const userRouter = express.Router();
const { protect } = require("../middleware/authMiddleware");

//  SETTING UP THE STORAGE TO STORE THE IMAGES OF THE WEBSITE
// USING MULTER
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination");
    console.log(file);
    console.log(path.join(__dirname, "../../client/public"));
    cb(null, path.join(__dirname, "../../client/src/Static/uploads"));
  },
  filename: (req, file, cb) => {
    console.log("file name");

    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/uploadAvatar", upload.single("avatar"), uploadAvatar);
userRouter.get("/userData", protect, getCurrentLoggedInUser);
userRouter.get("/getUserData/:userId", getUserData);
userRouter.get("/:userId/getuserlisting", getUserListing);
userRouter.post("/addfavorite", addFavorite);
userRouter.get("/:userId/getfavorites", getFavorite);

module.exports = userRouter;
