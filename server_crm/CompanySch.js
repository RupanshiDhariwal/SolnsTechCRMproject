const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  companypassword: {
    type: String,
    required: true,
  },
  companyconfirmpassword: {
    type: String,
    required: true,
  },
  employeecode: {
    type: String,
    required: true,
  },
  companyaddress: {
    type: String,
    required: true,
  },
});

mongoose.model("Company", CompanySchema);
