const express = require("express");
const homeRouter = require("./Routes/Home");
const aboutRouter = require("./Routes/about");
const contentRouter = require("./Routes/content");



const app = express();
const PORT = 8000;


app.set("view engine", "ejs");

app.use("/",homeRouter);
app.use("/",aboutRouter);
app.use("/",contentRouter);

app.listen(PORT, (error) => {
       console.log(`server running on port ${PORT}`);
});