const mongoose = require("mongoose");
const validator = require("validator");
const personal = require ("../utils/allowed.js") 

const userschema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, " First Name  required"],
  },
  last_name: {
    type: String,
    required: [true, "  Last Name  required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "This Is No Email Complete "],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: [personal.ADMIN,personal.USER],
    default:personal.USER ,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png" ,
  },
});

module.exports = mongoose.model("User", userschema);
