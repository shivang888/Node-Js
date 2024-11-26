const express = require("express");

const contentRouter = express.Router();

contentRouter.get("/content", (req, res) => {
  res.render("content");
});


module.exports = contentRouter;