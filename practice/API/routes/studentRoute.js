const StudentModel = require("../model/studentModel");

const express = require("express");
const bcrypt = require('bcrypt');
const studentRouter = express.Router();

studentRouter.get("/",async (req,res)=> {
    let getStudentData = await StudentModel.find({});
    res.status(200).json({stdentData: getStudentData});
})

studentRouter.post("/addStudent",async (req,res) => {
    try{
        req.body.password = await bcrypt.hash(req.body.password,10)
        await StudentModel.create(req.body);
        res.status(201).json({message : "student added successfully"});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


studentRouter.delete("/deleteStudent/:id",async (req, res)=> {
         try {
            await StudentModel.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: "Student deleted sucessfully" });
         } catch(error) {
            return res.status(404).json({ message: "Student not found" });
         }
});

studentRouter.put("/updateStudent/:id",async (req,res) => {
    try{
        await StudentModel.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json({message: "Student upadated successfully"});
    } catch (err) {
        return res.status(404).json({message:"Student not found"});
    }
});


module.exports = studentRouter;