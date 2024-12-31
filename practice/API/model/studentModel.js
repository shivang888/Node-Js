const mongoose = require("mongoose");
const { type } = require("os");


const studentSchema = mongoose.Schema({
    studentName : {type:String,reqired: true},
    email: { type: String, required: true },
    password: { type: String, reqired: true },
});

const StudentModel = mongoose.model("student",studentSchema);

module.exports = StudentModel;