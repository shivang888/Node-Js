const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine","ejs")



app.listen(PORT, () => {
     console.log(`server started at port : ${PORT}`);
}); 
    