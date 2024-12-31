const express = require("express");
const usermodel = require("../model/usermodel");
const path = require("path");
// const passport = require("passport")
const passport = require("../cofig/passport-local");
const nodemailer = require("nodemailer");
const dashbordrouter = express.Router()

dashbordrouter.get("/", async (req, res) => {
   
    res.render("singin")
})

dashbordrouter.get("/singup", (req, res) => {
    res.render("singup")

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




dashbordrouter.get("/dashboard",passport.isAuth,(req, res) => {
    
    res.render("dashboard")

})

dashbordrouter.get("/table",passport.isAuth,async(req, res) => {
   const userdata=await usermodel.find({})
    res.render("table",{userdata})

})

dashbordrouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/"}),
    (req, res) => {
     
        console.log("Hello from login");
        res.redirect("/dashboard");
    }
);

dashbordrouter.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
        console.log(err);
        
     })
    res.redirect("/")
})

dashbordrouter.get("/changepassword",passport.isAuth,(req,res)=>{
    res.render("changepassword")
});

dashbordrouter.post("/newpassword",async(req,res)=>{
    const{oldpassword,newpassword,confimpassword}=req.body;
    const id=res.locals.user.id;
    const userdata=await usermodel.findById(id);
    if (oldpassword===userdata.password) {
        if (newpassword!==oldpassword) {
            if (newpassword===confimpassword) {
              await  usermodel.findByIdAndUpdate(userdata._id,{password:newpassword})
              res.redirect("/")
            } else {
        res.redirect("back")     
            }
        } else {
        res.redirect("back")
        }
    }else{
        res.redirect("back")
    } 
});


dashbordrouter.post("/forgotPassword", async (req, res) => {
    try {
      let getUser = await usermodel.findOne({useremail: req.body.forgotemail });
      if (!getUser) {
        console.log(getUser);
        
        return res.redirect("/");
      }
  
      let otp = Math.floor(Math.random() * 10000);
  
      res.cookie("getOtp", otp);
      res.cookie("getemail",getUser.useremail);
  
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dhruvalthakor007@gmail.com",
          pass: "mwbd zmkj soax jgcw",
        },
      });
  
      var mailOptions = {
        from: "dhruvalthakor007@gmail.com",
        to: getUser.useremail,
        subject: "OTP",
        text: `OTP -${otp}`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.redirect("/otpPage");
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
  
  dashbordrouter.get("/otpPage", (req, res) => {
    res.render("otp");
  });
  dashbordrouter.get("/forgotpassword", (req, res) => {
    res.render("forgotpassword");
  });
  
  
  dashbordrouter.post("/checkOtp", (req, res) => {
    const cookieOtp = req.cookies["getOtp"];
    if(cookieOtp == req.body.otp){
     res.redirect("/forgotpassword");
    }
  });
  
  dashbordrouter.post("/forgotpassword2",async(req,res)=>{
    const{newpassword,confirmpassword}=req.body;
    const cookieemail = req.cookies["getemail"];
    let getUser = await usermodel.findOne({useremail:cookieemail });
  
            if (newpassword===confirmpassword) {
              await  usermodel.findByIdAndUpdate(getUser._id,{password:newpassword})
              res.redirect("/")
            } else {
        res.redirect("back")     
            }
        
});


module.exports = dashbordrouter;
