const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("userDatabase", userSchema);

module.exports = UserModel;