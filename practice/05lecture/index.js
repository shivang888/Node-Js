const express = require("express");
const app = express();
const PORT = 8000;


app.get('/',(req,res)=> {
      res.send("Hello Namste Kad shivnag Home Page ");  
})

app.get('/about',(req,res)=> {
    res.send(`Namste ${req.query.name}.Your age is ${req.query.age}`);
});

app.listen(PORT, () => {
     console.log(`server started at port : ${PORT}`);
});