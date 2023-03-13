const express = require("express");
const https = require("http");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const multer = require("multer");
const stripe = require("stripe")(
  "sk_test_51MCmyoDMZ0iV8W3mjDzOyrjTGxA2sFutWTAFiGjiL9hrtzcfWK71t34VGiqB53DGFfyjQSWydCZpq0Z8JFG3Yu6w00tA68juh6"
);
const listItem = require("./models/listItemModel");
const User = require("./models/userModel");
const port = 8080;
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("helo");
});

try {
  mongoose.connect(
    "mongodb+srv://Diksha:Conestoga2021@cluster0.otr4yhi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch (error) {
  res.send("Error");
}

//  SETTING UP THE STORAGE TO STORE THE IMAGES OF THE WEBSITE
// USING MULTER
// const storage = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename);
//   },
// });

// // TELLING MULTER TO STORE THE DATA
// const upload = multer({ storage: storage });

// users route for authenticaiton and other required puposes.
app.use("/users", require("./routes/userRoutes"));
app.use("/listing", require("./routes/listingRoutes"));
app.use("/conversation", require("./routes/conversationsRoutes"));
app.use("/messages", require("./routes/messagesRoutes"));
// app.use("/payment", require("./routes/paymentRoutes"));

app.post("/payment", cors(), async (req, res) => {
  let { amount, id, product, userId } = req.body;
  console.log(req.body);

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true,
    });
    if (payment.status === "succeeded") {
      let updatedItem = await listItem.findOneAndUpdate(
        { _id: product._id },
        { isSold: true },
        { new: true }
      );

      await User.findOneAndUpdate(
        {
          _id: userId,
        },

        {
          $addToSet: { purchasedItems: product._id },
        }
      );
    }
    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on port 8080`);
// });

https.createServer({ rejectUnauthorized: false }, app).listen(8080);
