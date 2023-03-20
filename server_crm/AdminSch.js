const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  bdaname: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bdapassword: {
    type: String,
    required: true,
  },
  bdaconfirmpassword: {
    type: String,
    required: true,
  },
  companycode: {
    type: String,
    required: true,
  },
  // type: {
  //   type: String,
  //   default: "admin",
  // },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

mongoose.model("Admin", AdminSchema);
