const express = require("express");

const dashboardRouter = express.Router();


dashboardRouter.get("/signup", (req, res) => {
    res.render("signup");
  });

dashboardRouter.get("/signIn",(req,res) => {
    res.render("signIn");
})

dashboardRouter.post("/insertData", async (req, res) => {
  console.log(req.body);
  try {
    await UserModel.create(req.body);
    console.log("User created");
    res.redirect("/signIn");
  } catch (err) {
    console.log(err);
  }
});


module.exports = dashboardRouter;
