const express = require("express");
const dashboardRouter = require("./routes/dashboardRoute");
const path = require("path");
const connection = require("./config/db");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const PassportStrategy = require("./config/passport-local");
const connectFlash = require("./config/flash");

const app = express();

app.set("view engine", "ejs");
app.use(flash());
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "nodeAdmin",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100 * 60 * 60 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
app.use(connectFlash.setFlash);

app.use("/", dashboardRouter);

app.listen(1008, (error) => {
  if (error) {
    console.log("Error starting the server");
    return;
  }
  connection();
  console.log("Server is running on port 8080");
});
