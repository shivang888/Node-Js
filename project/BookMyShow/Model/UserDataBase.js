const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const imagePath = "uploads"

const userShcema = mongoose.Schema({

    image: {
        type: String,
        required: true
    },
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,  ".." , imagePath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    },
  }); 
  
  userShcema.statics.imageUpload = multer({ storage: storage }).single("image");

  userShcema.statics.imagePath = imagePath;


  const UserModel = mongoose.model("dataBase" , userShcema);

  module.exports = UserModel;
