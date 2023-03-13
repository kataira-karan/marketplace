const cloudinary = require("cloudinary").v2;

//  connecting node js to cloudinary
cloudinary.config({
  cloud_name: "de9z2euz5",
  api_key: "233121596766344",
  api_secret: "pVRFlBFhNcRJ86D0yLaojyg7cos",
});

module.exports = cloudinary;
