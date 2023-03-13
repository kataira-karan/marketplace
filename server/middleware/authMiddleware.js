const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from the header
      // will get the item at first index as the token is genrated with Bearer at front.
      token = req.header.authorization.splite("")[1];

      // now we need to verify the token
      const decode = jwt.verify(token, "SECERET");

      // get user from the token
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Protected");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token");
  }
};

module.exports = { protect };

// bearer token
