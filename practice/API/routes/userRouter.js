const express = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
UserRouter.post("/register", async (req, res) => {
  console.log("register");
  console.log(req.body);
  try {
    const existEmail = await UserModel.findOne({ email: req.body.email });
    console.log(existEmail);

    if (!existEmail) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await UserModel.create(req.body);
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(200).json({ message: "This email already exists" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

UserRouter.post("/login", async (req, res) => {

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });

        return res.status(200).json({ message: "login Successfully", token });
      } else {
        res.status(400).json({ message: "invalid Password" });
      }
    } else {
      res.status(404).json({ message: "invalid email" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

module.exports = UserRouter;