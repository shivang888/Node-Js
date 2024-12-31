const express = require("express");
const usermodel = require("../model/usermodel");
const path = require("path");
// const passport = require("passport")
const passport = require("../cofig/passport-local");
const nodemailer = require("nodemailer");
const dashbordrouter = express.Router()

dashbordrouter.get("/", async (req, res) => {
   
    res.render("login")
})

dashbordrouter.get("/register", (req, res) => {
    res.render("register")

})




dashbordrouter.post("/isartdata",usermodel.imgupload,async(req,res)=>{

    try {
        if (req.file) {
            req.body.profile=usermodel.imgepath+"/"+req.file.filename;
        };
        await usermodel.create(req.body);
        console.log("data add successfully");
        res.redirect("/")
        
    } catch (error) {
        console.log(error);
        
    }

});




dashbordrouter.get("/categoryList",passport.isAuth,(req, res) => {
    res.render("categoryList")

})
dashbordrouter.get("/productList",passport.isAuth,(req, res) => {
  res.render("productList")

})

dashbordrouter.get("/productList",passport.isAuth,async(req, res) => {
   const userdata=await usermodel.find({})
    res.render("table",{userdata})

})

dashbordrouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/"}),
    (req, res) => {
     
        console.log("Hello from login");
        res.redirect("/categoryList");
    }
);

dashbordrouter.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
        console.log(err);
        
     })
    res.redirect("/")
})

module.exports = dashbordrouter;
