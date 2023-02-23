const mongoose = require("mongoose");

const userDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "User",
  }
);

const UserModel = mongoose.model("User", userDetailsScehma);

module.exports = UserModel;
