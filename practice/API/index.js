const connection = require("./config/db");
const studentRouter = require("./routes/studentRoute");

const express = require('express');
const app = express();
const PORT = 8080;
const dotenv = require("dotenv");


dotenv.config();

app.use(express.urlencoded());

app.use("/", studentRouter);

app.listen(process.env.PORT , (error) => {
    if(error){
        console.log(error)
        return
    }
    connection();
    console.log(`Server is running on port ${PORT}`);
})