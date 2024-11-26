const express = require("express");
const app = express();
const port = 8000;


app.set("view engine","ejs");

app.get("/", (req, res)=>{
    
    return res.render("index")
})


app.listen(port,(error) => {
    console.log(`server is running on port ${port}`);
})