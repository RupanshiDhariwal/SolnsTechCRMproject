const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    email: {
        type: String,
        required: true
    },
    leadmakeremail: {
        type: String,
        required: true
    },
    description: String,
    status: String,
    product: String,
    aadhaarfile: String,
    panfile: String,
    itrfile: String,
    residentialproof: String,
    bankstatement: String,
    leadtype: {
        type: String,
        default: "normal",
    },
    allocatedto: String,
    allocatedby: String,
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("Lead",leadSchema);