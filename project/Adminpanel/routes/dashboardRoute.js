const express = require("express");
const UserModel = require("../model/UserModel");
const passport = require("../config/passport-local");
var nodemailer = require("nodemailer");
const { redirect } = require("express/lib/response");
const dashboardRouter = express.Router();

dashboardRouter.get("/", (req, res) => {
  // const cookieData = req.cookies["auth"];
  // if (cookieData) {

  // res.redirect("/dashboard");

  //   return;
  // }
  res.render("signIn");
});

dashboardRouter.get("/signup", (req, res) => {
  res.render("signup");
});

dashboardRouter.post("/insertData", async (req, res) => {
  console.log(req.body);
  try {
    await UserModel.create(req.body);
    console.log("User created");
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

dashboardRouter.get("/dashboard", passport.isAuth, (req, res) => {
  // const cookieData = req.cookies["auth"];
  // console.log(cookieData);
  // if (!cookieData) {
  // res.redirect("/");
  // }
  res.render("dashboard");
});

dashboardRouter.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      req.flash("success", "login Successfully");
      return res.redirect("/dashboard");
    } catch (err) {
      req.flash("error", "invalid login");
      console.log(err);
    }
  }
);

dashboardRouter.get("/viewAdmin", passport.isAuth, (req, res) => {
  // const cookieData = req.cookies["auth"];
  // if (cookieData) {
  res.render("viewAdmin");
  //   return;
  // }
});

dashboardRouter.get("/changePassword", (req, res) => {
  res.render("changePassword");
});

dashboardRouter.post("/getChangePassword", (req, res) => {
  console.log(req.body);
});
dashboardRouter.get("/logout", (req, res) => {
  // res.clearCookie("auth");
  req.session.destroy(function (err) {
    
  });
  res.redirect("/");
});

dashboardRouter.post("/forgotPassword", async (req, res) => {
  try {
    let getUser = await UserModel.findOne({ email: req.body.email });
    if (!getUser) {
      return res.redirect("/");
    }

    let otp = Math.floor(Math.random() * 10000);

    res.cookie("getOtp", otp);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shivangkad9@gmail.com",
        pass: "npfi xieh ibgb uuzi",
      },
    });

    var mailOptions = {
      from: "shivangkad9@gmail.com",
      to: getUser.email,
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

dashboardRouter.get("/otpPage", (req, res) => {
  res.render("otp");
});

dashboardRouter.post("/checkOtp", (req, res) => {
  const cookieOtp = req.cookies["getOtp"];
  console.log(cookieOtp);
  console.log(req.body);
  if(cookieOtp == req.body.otp){
    redirect("/changeOtp");
  }
});


dashboardRouter.get("/addCategory", (req, res) => {
  res.render("addCategory");
})


dashboardRouter.post("/insertCategory", (req, res) => {
  console.log(req.body)
})


dashboardRouter.get("/addSubCategory", async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.render("addSubCategory", { categories: categories });
  } catch (err) {
    console.log(err);
  }
});

dashboardRouter.post("/insertSubCategory", async (req, res) => {
  try {
    await SubCategoryModel.create(req.body);
    console.log("Subcategory created");
    res.redirect("back")
  } catch (err) {
    console.log(err);
  }
});


dashboardRouter.get("/viewSubCategory", async (req, res) => {
 let getData = await SubCategoryModel.find().populate("categoryId").exec();
console.log(getData)
  res.render("viewSubCategory",{getData})
})


module.exports = dashboardRouter;
