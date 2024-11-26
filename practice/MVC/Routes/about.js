const express = require("express");

const aboutRouter = express.Router();

aboutRouter.get("/about", (req, res) => {  // controllers 
  res.render("about");
});


module.exports = aboutRouter;