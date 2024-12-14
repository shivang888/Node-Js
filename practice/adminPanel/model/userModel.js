const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
   username: {
    type: String,
    require: true
   },
   email: {
    type: String,
    require: true
   },
   Password: {
    type: String,
    require: true
   }
});

const Usermodel = mongoose.model("adminPanelData",userSchema);

module.exports = Usermodel;
