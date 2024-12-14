const express = require('express');
const port = 8000;
const app =express();
const connection = require("./config/db")
const path = require('path');
const dashboardRouter = require('./routes/dashboardRoute');

app.use("/assets" , express.static(path.join(__dirname , "/assets")))

app.set("view engine","ejs");

app.use("/" ,dashboardRouter);



app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
        return;
      }
      connection();
    console.log(`server running on port ${port}`);
});





