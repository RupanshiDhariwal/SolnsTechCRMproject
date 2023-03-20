const mongoose = require("mongoose");

const OnboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  product: {
    type: String,
  },
  aadhaarfile: {
    type: String,
  },
  panfile: {
    type: String,
  },
  itrfile: {
    type: String,
  },
  residentialproof: {
    type: String,
  },
  bankstatement: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
});

mongoose.model("Onboard", OnboardSchema);
